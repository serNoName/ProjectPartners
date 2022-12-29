$(document).ready(function () {
    //log in account (header)
    $('.header__login > .btn').click(function (e) { 
        e.preventDefault();

        $(this).parents().children('.btn:not(.header__shortlist)').fadeOut(400, function () {
            $(this).parents().siblings('.header__profile').fadeIn(300).css('display', 'flex');
        });
    });


    //open menu on phones (header)
    $('.header__burger').click(function (e) { 
        e.preventDefault();
        
        $(this).toggleClass('active')
        $('.header__menu').toggleClass('active');
    });


    //close menu on phones (header)
    $('.header__menu-close').click(function (e) { 
        e.preventDefault();
        
        $(this).parent().removeClass('active');
    });


    //change main theme
    $('.promo__select-theme-item').click(function() {
        if (!$(this).hasClass('active')){
            $(this).addClass('active').siblings().removeClass('active');
            if ($('.promo__select-theme-item:last-child').hasClass('active')) {
                $('*[data-theme="business"]').stop(true, false).fadeOut(300, function() {
                    $('*[data-theme="partners"]').stop().fadeIn(300);
                });
            } else {
                $('*[data-theme="partners"]').stop(true, false).fadeOut(300, function() {
                    $('*[data-theme="business"]').stop().fadeIn(300);
                });
            }
        }
    });


    /* sliders */
    $('#promoSlider').slick({
        slidesToShow: 8,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 300,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    centerMode: true,
                    slidesToShow: 3,
              }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
              }
            }
        ]
      });
      $('#reviewsSlider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
        dots: true,
        customPaging: (slider) => `<span></span>`,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
              }
            },
            {
                breakpoint: 993,
                settings: {
                    slidesToShow: 2,
              }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
      });
});