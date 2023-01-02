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
    
    //list in do
    $('.do__list-item').on('animationend', function(){
        if($(this).hasClass('do__list-item-last')) {
            $(this).removeClass('active').parent().children(':first-child').addClass('active');
        } else {
            $(this).removeClass('active').next().addClass('active');
        }
    });

    //add to shortlist
    $('.add-to-shortlist').on('click', function (e) {
        e.preventDefault();
        let myElm = $('#countInShortList');

        if($(this).text() == 'Added to Shortlist') {
            $(this).removeClass('active').text('Add to Shortlist');
            if(myElm.text() == 1){
                myElm.text(0).removeClass('active');
            } else {
                myElm.text(parseInt(myElm.text())-1);
            }
            
        } else {
            $(this).addClass('active').text('Added to Shortlist');
            myElm.addClass('active')
            myElm.text(parseInt(myElm.text())+1);
            $('.alert').addClass('active');
        }
    });

    $('.alert').click(function(){
        $(this).removeClass('active');
    });


    $('.search__menu-item').click(function(){
        $(this).toggleClass('active');
    });

    const changeSlideEmpower = function () { 
        if($('.empower__list-item').last().hasClass('completed')) {
            $('.empower__list-item').removeClass('completed').first().addClass('active');
            $('.empower__image').removeClass('active').first().addClass('active').fadeIn(200);
            $('.empower__bg').removeClass('active').first().addClass('active').fadeIn(200);
            $('.empower__bg').last().css('display', 'none');
            $('.empower__image').last().css('display', 'none');
        } else {
            $('.empower__list-item.active').removeClass('active').addClass('completed').next().addClass('active');
            if(!$('.empower__list-item').last().hasClass('completed')){
                $('.empower__image.active').fadeOut(200, function(){
                    $(this).removeClass('active').next().fadeIn(200, function(){ $(this).addClass('active'); });
                })
                $('.empower__bg.active').fadeOut(200, function(){
                    $(this).removeClass('active').next().fadeIn(200, function(){ $(this).addClass('active'); });
                })
            }
        }
        setTimeout(changeSlideEmpower, 5000);
    };
    changeSlideEmpower();

    /* sliders */
    $('#promoSlider').slick({
        slidesToShow: 8,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
        centerMode: true,
        autoplay: true,
        autoplaySpeed: 300,
        responsive: [
            {
                breakpoint: 767,
                settings: {
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