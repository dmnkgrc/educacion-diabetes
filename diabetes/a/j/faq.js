$(function () {

    $(".faq-list-item__question").each(function () {

        $(this)
            .off("click")
            .on("click", function () {
            	$(this).toggleClass('open');
                $(this).next().stop().slideToggle();
            });
    });
});