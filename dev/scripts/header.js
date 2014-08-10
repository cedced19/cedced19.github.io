$(function(){
    var header = $('.header'),
        masthead = $('.masthead'),
        scrollNotice = $('.scroll-notice'),
        body = $('body');


    function centerMasthead(){
        var mastheadHeight = masthead.height();
        masthead.css({
            "margin-top": "-" + (mastheadHeight / 2) + "px"
            });
    };

    scrollNotice.click(function(){
        $('html, body').animate({
            scrollTop: $('.content-wrap').offset().top
        },800, "swing");
    });

    $(window).scroll(function(){
        var scrollDist = $(window).scrollTop();
        scrollNotice.css({
            "opacity" : 1 - (scrollDist / 600)
        });
    });

    centerMasthead();

    $(window).resize(function(){
        centerMasthead();
    });

    body.on('keydown', function(e){
        if(scrollNotice.css('opacity') == 1){
            if(e.keyCode === 13 ){
                scrollNotice.trigger('click');
            };
        };
    });

});