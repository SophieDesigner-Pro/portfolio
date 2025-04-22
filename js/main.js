$(function () {

    $('.gnb li').first().click(function () {
        $('.fix_nav').addClass('on');
    });

    $('.fix_nav li').click(function(e){
        e.preventDefault();
        $('.fix_nav').removeClass('on');
        let target=$(this).find('a').attr('href');

        $('html,body').animate({
            scrollTop : $(target).offset().top
        },200);
    });

});