$(function () {

    imageFader.init($(".unslider-active").find(".image-fader"));

});




var imageFader = {};

imageFader.imageArray = [];

imageFader.sycleTime = 2500;

imageFader.animationDuration = 1000;

imageFader.currentImageCounter = 0;


imageFader.reinit = function () {


    delete imageFader.selector;

    for(var i = 0; i < imageFader.imageArray.length; i++)
    {
        imageFader.imageArray.splice(i, 1);
    }

    imageFader.selector = $(".unslider-active").find(".image-fader");

    imageFader.selector.css({
        overflow : "hidden"
    });

    imageFader.selector.find("img").css({
        position: "absolute"
    });


    imageFader.selector.find("img").each(function () {

        imageFader.imageArray.push($(this));

    });

    imageFader.currentImageCounter = 0;

    imageFader.fadeAllImagesExceptTheCurrentOut();

};




imageFader.init = function ($imageFaderSelector) {

    imageFader.selector = $imageFaderSelector;

    imageFader.selector.css({
        overflow : "hidden"
    });

    imageFader.selector.find("img").css({
        position: "absolute"
    });


    imageFader.selector.find("img").each(function () {

        imageFader.imageArray.push($(this));

    });


    imageFader.fadeAllImagesExceptTheCurrentOut();

    setTimeout('imageFader.fadeSycle()', imageFader.sycleTime);

};



imageFader.fadeSycle = function () {

    imageFader.fadeAllImagesExceptTheCurrentOut();

    imageFader.fadeTheCurrentImageIn();


    if((imageFader.imageArray.length - 2) >= imageFader.currentImageCounter)
    {
        imageFader.currentImageCounter++;
    }
    else
    {
        imageFader.currentImageCounter = 0;
    }

    setTimeout('imageFader.fadeSycle()', imageFader.sycleTime);

};

imageFader.fadeTheCurrentImageIn = function () {

    var $currentImage = $(imageFader.imageArray[imageFader.currentImageCounter]);

    if(imageFader.itsSliderIsActive())
    {
        $currentImage.animate({
                opacity : "1.0"
            },
            imageFader.animationDuration
        );
    }


};

imageFader.itsSliderIsActive = function () {


    return imageFader.selector.parentsUntil("li").last().parent().hasClass("unslider-active");

};


imageFader.fadeAllImagesExceptTheCurrentOut = function () {

    var imageLength = imageFader.imageArray.length;

    if(imageLength > 0)
    {
        var currentImagecounter = 0;

        while(currentImagecounter < imageLength)
        {

            if(currentImagecounter != imageFader.currentImageCounter)
            {
                var $currentImage = $(imageFader.imageArray[currentImagecounter]);

                if(imageFader.itsSliderIsActive())
                {
                    $currentImage.animate({
                            opacity: "0.0"
                        },
                        imageFader.animationDuration
                    );
                }
            }

            currentImagecounter++;

        }

    }

};