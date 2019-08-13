

$(function() {

    var pagePreSet = getUrlParameter("p");

    //Init sliders
    slider.initNavigation();
    slider.init($(".slide-wrapper"), pagePreSet);
    slider.glossaryInit($(".slide-wrapper"));

    //Set navigation
    $nav_triggers = $(".mobile-nav-icon, .nav__fade-bg");
    $open_triggers = $nav_triggers.add(".mobile-nav-icon, .is-training-page, .modules-navigation, .nav__fade-bg");

    $nav_triggers.on("click ", function(e) {
        $open_triggers.toggleClass("open");

        // set cookie
        var nav_cookie = document.cookie.replace(/(?:(?:^|.*;\s*)navigation\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        //console.log(nav_cookie);

        if (nav_cookie === "open") {
            document.cookie = "navigation=;path=/";
        }
        else {
            document.cookie = "navigation=open;path=/";
        }
        e.preventDefault();
        //console.log(document.cookie);
    });

    //Check if has bookmark
    checkIfHasBookmark();

    //Scroll to current active nav in training navigation
    if($(".modules-navigation").length > 0) {
        $(".modules-navigation").scrollTop($("#active").offset().top);
    }

    //Go fullscreen with the slider
    $(".go-fullscreen").on("click ", function(e){
        $(".slider-container, .modules-navigation, .is-training-page").addClass("is-fullscreen", function(){
            resizeContentSlider();
        });
    });

    //Leave fullscreen
    $(".leave-fullscreen").on("click", function(e){
        $(".slider-container, .modules-navigation, .is-training-page").removeClass("is-fullscreen", function(){
            resizeContentSlider();
        });
    });

    //Display popup goals
    $(".btn.goals").on("click", function(){
        $(this).find(".goals-container").addClass("visible");
    });

    $(document).on("click", ".close-goals", function(){
        $(".goals-container").removeClass("visible");
    });

    //Check if content of slider is smaller than slider container while resizing the window
    resizeContentSlider();
    $(window).resize(function() {
        clearTimeout(currentTimer);
        currentTimer = setTimeout(function(){
            recalculateIeSlider();
            resizeContentSlider();
        }, 100);
    });

    //Close quizz success message
    $(".quizz-success > .quizz-success__close").on("click ", function(e){
        $(this).closest(".quizz-success").removeClass("open");
    });

    //Bookmark a page
    $(".bookmark").on("click", function(){
        $(this).addClass("bookmarked");
        saveBookmark();
    });
    //Close bookmark
    $(".bookmark-popup > .bookmark-close").on("click", function(){
        $(".bookmark-popup-container").removeClass("visible");
    });
    //Go to bookmark
    $(".bookmark-link").on("click", goToBookmark);


    //Write all Bluetooth in Navigation in italic
    // $(".modules-navigation__link").each(function(){
    //     var text = $(this).text();
    //     $(this).html(text.replace("Bluetooth®", "<em>Bluetooth®</em>"));
    // });

    //Interactive Images
    $(".point").on("click", function(){

        var popupId = $(this).attr("data-open-popup");
        var pointIndex = popupId.substr(popupId.indexOf("-") + 1);

        if(!$(this).is(".open")) {
            
            $(".point, .popup, .img-legend ul > li a").removeClass("open")
            $(".popup").hide();

            $(popupId).addClass("open").fadeIn();
            $(".point[data-open-popup='" + popupId + "']").addClass("open");
            $(".img-legend ul > li:nth-child(" + pointIndex + ") a").addClass("open");

        } else {
            $(".point, .popup, .img-legend ul > li a").removeClass("open")
            $(".popup").hide();
        }
    }); 

});


function setReferencesList(){

    //Search For References and give the Liste the References class
    var startHeader = 1;
    var endHeader = 6;
    var selectString = "";
    var headerSearchWord = "References";

    while(startHeader <= endHeader){

        selectString += "h" + startHeader + ":contains(" + headerSearchWord + ")";

        if(startHeader < endHeader)
            selectString += ", ";

        startHeader++;
    }
    $(selectString).each(function(){

        var $nextElem = $(this).next();

        if($nextElem.is("ol")){
            $nextElem.addClass("references-list");
        }

    });
}

$(window).on("click", function() {
    $(".glossary-box").remove();
});

var currentTimer;
var currentSlideIndex = 1;

var $nav_triggers;
var $open_triggers;

var slider = {};
var $slides;

slider.selector = "";

/**
 * Slider Hack start yanick
 */

var slideDirection = "";

$(document).on("keydown",function (event) {

    if(event.which == 39)
    { //Arrow Right
        slideDirection = "right";
    }

    if(event.which == 37)
    { //Arrow Left
        slideDirection = "left";
    }
});


slider.triggerKeyRight = function () {
    var e = jQuery.Event("keyup");
    e.which = 39;
    $(document).trigger(e);
};


slider.triggerKeyLeft = function () {
    var e = jQuery.Event("keyup");
    e.which = 37;
    $(document).trigger(e);
};


/**
 * Slider Hack end yanick
 */

slider.glossaryInit = function ($searchContext) {

    if(typeof $searchContext == "undefined") {

    } else {
        // console.info($searchContext.find("a[href*="glossary"]"));
        $searchContext.find('a[href*="glossary"]').on("click", function (event) {

            event.preventDefault();

            var $glossaryPositionn = $(event.currentTarget).position();
            var boxLeftPoint = $glossaryPositionn.left;
            var windowWith = $( document ).width();
            var $clickedElement = $(this);
            var aPosi = $clickedElement.offset();

            $.ajax({

                url: $(this).attr("href"),
                dataType : "html"

            }).done(function (data) {

                $(".glossary-box").remove();

                $(data)
                    .addClass("glossary-box")
                    .css({
                        top: (parseInt(aPosi.top) + 20) + "px",
                        left: (parseInt(aPosi.left) + 20) + "px"
                    })
                    .appendTo("body");

                var $glossaryBox = $(".glossary-box");

                if((parseInt($glossaryBox.css("width")) + boxLeftPoint) > windowWith) {
                    //Das Glossary popup hat rechts kein platz und wird deshalb nach links geschoben
                    $glossaryBox.css("left", (windowWith - parseInt($glossaryBox.css("width")) - 20 ) + "px");
                }

            });
        });
    }
};



slider.init = function($sliderElement, pagePreSet){

    if($($sliderElement).hasClass("is-slidered")) {

    } else {

        slider.selector = $sliderElement;

        $sliderElement.each(function () {

            var $activeSliderElem = $(this);

            if($activeSliderElem.is(":visible")) {

                $activeSliderElem.addClass("is-slidered");

                $sliderElement.on("unslider.ready", function() {

                    //Recalculate slider width if IE
                    recalculateIeSlider();

                    $(".slider-container").addClass("slider-ready");
                });

                $sliderElement.unslider({
                    speed: 500,
                    infinite: false,
                    arrows: {
                        prev: '<div class="prev-slide"><a class="prev-link" href="#"></a></div>',
                        next: '<div class="next-slide"><a class="next-link" href="#"></a></div>'
                    },
                    nav: false
                }).on("unslider.change", function (event, index, slide) {

                    var $counterContainer = $(event.currentTarget).parent().find(".slider-counter");
                    var currentPageCount = parseInt(index) + 1;
                    var totalPageCount = $(event.currentTarget).find("ul").first().find(">li").length;

                    /**
                     * Slieder Hack start yanick
                     */

                    if (index == 0 && slideDirection == "right")
                    {// Ende erreicht

                        slider.triggerKeyLeft();
                        currentPageCount = totalPageCount;
                    }

                    if (currentPageCount == 0 && slideDirection == "left")
                    {//Anfang erreicht
                        slider.triggerKeyRight();
                    }

                    if(currentPageCount <= 0)
                    {
                        currentPageCount = 1;
                    }

                    /**
                     * Slider Hack end yanick
                     */


                    $counterContainer.text(currentPageCount + "/" + totalPageCount);
                    currentSlideIndex = currentPageCount;
                    //console.log(currentPageCount + " - " + totalPageCount)

                    //Check if is last slide and hide button "next"
                    if(currentPageCount == totalPageCount) {
                        $(".next-slide").hide();
                        $(".next-lesson").css("display", "block");
                    } else if(currentPageCount < totalPageCount && !$(".next-slide").is(":visible")){
                        $(".next-slide").show();
                        $(".next-lesson").css("display", "none");
                    }

                    //Check if content is wider than container for centering purpose
                    resizeContentSlider();

                    //Look for lists to be checkmarked or unstyled
                    $(".list--checkmarks").closest("p").next().addClass("checkmarks");
                    $(".list--unstyled").closest("p").next().addClass("unstyled-list");

                    $(".glossary-box").remove();

                    //Start image fader
                    // imageFader.init($(".unslider-active .image-fader"));

                    //Quizzes
                    $(".quizz-success").removeClass("open");
                    $(".unslider-active .possible-solution").removeClass("shake disabled")
                    var answers = $(".unslider-active .possible-solution > label > input");

                    //Loop through each answer
                    checkTheAnswer(answers);

                    //Remove bookmark icon
                    $(".bookmark").removeClass("bookmarked");

                    imageFader.reinit();

                    setReferencesList();

                }).parent().append('<div class="slider-counter">1/' + $(this).find("ul").first().find(">li").length + '</div>');

                if((pagePreSet - 1) <= 0){
                    pagePreSet = 1;
                }

                if(pagePreSet > parseInt($(this).find("ul").first().find(">li").length))
                {
                    pagePreSet = parseInt($(this).find("ul").first().find(">li").length);
                }

                $sliderElement.unslider("initSwipe");
                $sliderElement.unslider("animate:" + (pagePreSet - 1));

                //Go to slide nbr N if needed
                var slideIndex = parseInt(getUrlParameter("slide"));

                if(slideIndex) {
                    $sliderElement.unslider("animate:" + (slideIndex-1));
                }
                //console.log(window.location);
            }
        });
    }
};


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split("&"),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split("=");

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

/*slider.getSliderDiv = function(id, $targetContainer) {

    if ($targetContainer.length > 0) {
        $.ajax({
            "type": "POST",
            "contentType": "application/x-www-form-urlencoded; charset=UTF-8",
            "cache": false,
            "dataType": "text",
            url: "sections/training/slider.html?id=" + id,
            async: false
        }).done(function (data) {

            $targetContainer.find(".slide-wrapper");
            $targetContainer.append(data);
            slider.init($targetContainer.find(".slide-wrapper"));
            slider.glossaryInit($targetContainer.find(".slide-wrapper"));
        });
    }
};*/



slider.getSliderDiv = function(id, $targetContainer) {

    if ($targetContainer.length > 0) {
        $.ajax({
            "type": "POST",
            "contentType": "application/x-www-form-urlencoded; charset=UTF-8",
            "cache": false,
            "dataType": "text",
            url: "sections/training/slider.html?id=" + id,
            async: false
        }).done(function (data) {

            $targetContainer.find(".slide-wrapper");
            $targetContainer.append(data);
            slider.init($targetContainer.find(".slide-wrapper"));
            slider.glossaryInit($targetContainer.find(".slide-wrapper"));

        });
    }
};



slider.initNavigation = function() {

    $(".section-title, .section-subtitle, .section-title-clickextender").on("click",function (){

        $(".side-navigation").removeClass("open");
        $(".section-subtitle").text("");
        $(".training-module, .chapter.active").removeClass("active").find(".section-topbar").removeClass("open");
        $(this).parent().parent().parent().addClass("active").find(".section-topbar").addClass("open");
        $(this).parent().parent().parent().find(".chapter").first().addClass("active");

        //click the first lesson of the module
        $(this).parent().parent().parent().find(".side-navigation").find("li:not(.chapter-list)").first().find("a").trigger("click");

    });

    $(".mobile-nav-button").on("click",function() {

        if($(this).parents(".training-module").last().hasClass("active")) {
            //eigenes Navmenü öffnen
        } else {
            //anderes Navmenü öffnen
            $(".side-navigation").removeClass("open");
            $(".training-module").removeClass("active");
            $(this).parent().find(".section-title").trigger("click");
        }

        $(this).parents(".training-module").find(".side-navigation").toggleClass("open");
    });

    $(".close-side-nav").on("click", function (){
        $(".side-navigation").removeClass("open");
    });

    $(".side-navigation ul > li a").on("click",function (e){

        e.preventDefault();

        if($(this).hasClass("chapter-list")) {
            //Kapitel wurde angeclickt
            $(".side-navigation ul li ul").hide();
            $(this).next().toggle();

        } else {

            var dataId = $(this).attr("data-id");
            //Lesson wurde gecklickt
            if(dataId.length) {
                $(".unslider").remove();
                var $container = $(this).parents(".training-module").last();

                slider.getSliderDiv(dataId, $container);
                $(this).parents(".training-module").find(".side-navigation").removeClass("open");
                $(this).parents(".training-module").find(".section-subtitle").text($(e.currentTarget).text());

            }
        }
    });
};


function checkTheAnswer(answers) {

    var nbGoodAnswers = 0;
    var nbAnswersFound = 0;

    for(var i = 0; i < answers.length; i++) {

        //Reset checkboxes
        answers[i].checked = false;

        //Count the number of good answers to find
        if(answers[i].getAttribute("data-answer") == 1)
            nbGoodAnswers++;

        answers[i].onclick = function() {
            var value = this.attributes["data-answer"].value;

            if(value == 0) {
                $(".possible-solution").removeClass("shake");
                $(this).closest(".possible-solution").addClass("shake");
            }
            if(value == 1) {
                nbAnswersFound++;
                if(nbGoodAnswers == nbAnswersFound) {
                    $(".possible-solution").removeClass("shake").addClass("disabled");
                    setTimeout(function(){
                        $(".slider-container > .quizz-success").addClass("open");
                    }, 500);
                }
            }
        };
    }
}

//Resize content when wider than container itself
function resizeContentSlider(){
    //Check if content is wider than container for centering purpose
    if($(".unslider").length > 0) {
        if($(".unslider-active > .slide").outerHeight() >= $(".unslider-active").height()) {
            $(".unslider-active > .slide").addClass("no-vertical-center");
            $(".unslider-active").addClass("add-overflow");
        } else {
            $(".unslider-active > .slide").removeClass("no-vertical-center");
            $(".unslider-active").removeClass("add-overflow");
        }
    }
};

function saveBookmark() {

    var bookmark = {};

    //Fix for ie
    if (!window.location.origin) {
      window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    }

    bookmark.url = window.location.origin + window.location.pathname + "?slide=" + currentSlideIndex;
    bookmark.lesson = $(".crumbs > li.active").text();
    bookmark.chapter = $(".crumbs > li:eq( 1 )").text().split(" /")[0];
    bookmark.module = $(".crumbs > li:eq( 0 )").text().split(" /")[0];
    bookmark.slideIndex = currentSlideIndex;
    bookmark.slideTitle = $(".unslider-active > .slide h2").text();

    localStorage.removeItem("bookmarkAccuChek");
    localStorage.setItem("bookmarkAccuChek", JSON.stringify(bookmark));

    $(".bookmark-notif").addClass("visible");
    setTimeout(function(){
        $(".bookmark-notif").removeClass("visible");
    }, 3000); 

}

function checkIfHasBookmark() {

    var prevUrl = document.referrer;

    if ( localStorage.bookmarkAccuChek && prevUrl.indexOf("accu-chek") == -1 ) {

        var bookmark = JSON.parse(localStorage.getItem("bookmarkAccuChek"));

        //bookmark.url += bookmark.url + "?slide=" + bookmark.slideIndex;

        $(".bookmark-popup .bookmark-module").text(bookmark.module);
        $(".bookmark-popup .bookmark-chapter").text(bookmark.chapter);
        $(".bookmark-popup .bookmark-lesson").text(bookmark.lesson);
        $(".bookmark-popup .bookmark-page").text(bookmark.slideTitle);

        $(".bookmark-popup-container").addClass("visible");

        localStorage.removeItem("bookmarkAccuChek");
        localStorage.setItem("bookmarkAccuChek", JSON.stringify(bookmark));
    }
}

function getUrlParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
    .substr(1)
        .split("&")
        .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
    return result;
}

function goToBookmark(){

    var bookmark = JSON.parse(localStorage.getItem("bookmarkAccuChek"));

        if(bookmark) {
            var url = bookmark.url;
            localStorage.removeItem("bookmarkAccuChek");

            window.location.href = url;
        }

}

function recalculateIeSlider() {
    //Check if is IE to give pixel width
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (isIE()) { 
        var correctedWidth = $(".unslider-wrap").outerWidth() / $(".unslider-wrap > li").length;
        $(".unslider-wrap > li").css("width", correctedWidth + "px");
    } 
}

function isIE() {
  var ua = window.navigator.userAgent;

  // Test values; Uncomment to check result …

  // IE 10
  // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
  
  // IE 11
  // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
  
  // Edge 12 (Spartan)
  // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
  
  // Edge 13
  // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    //return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    return true;
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    //return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    return true;
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    //return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    return true;
  }

  // other browser
  return false;
}

