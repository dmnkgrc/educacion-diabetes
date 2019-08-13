$(function () {

    $(".glossary-list-item__question")
        .off("click")
        .on("click", function () {
            $(this).toggleClass('open');
            $(this).next().stop().slideToggle();
        });

});