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

        $('.overlayer').fadeOut(300)
        $(this).toggleClass('active')
        $('.nav').toggleClass('active');
        $('.overlayer').fadeIn(300)
    });

    //close menu on phones (header)
    $('.nav-close').click(function (e) {
        e.preventDefault();

        $('.overlayer').fadeOut(300)
        $(this).parent().removeClass('active');
        $('.header__burger').removeClass('active')
    });

    //close menu if click overlayer
    $('.overlayer').click(function () {
        $(this).fadeOut(300)
        $('.nav').removeClass('active');
        $('.header__burger').removeClass('active')
    })

    //change main theme
    $('.promo__select-theme-item').click(function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active').siblings().removeClass('active');

            if ($('.promo__select-theme-item:last-child').hasClass('active')) {
                $('*[data-theme="business"]').stop(true, false).fadeOut(300, function () {
                    $('*[data-theme="partners"]').stop().fadeIn(300)

                    $('.possibilities').addClass('theme-partners');
                })
            } else {
                $('*[data-theme="partners"]').stop(true, false).fadeOut(300, function () {
                    $('*[data-theme="business"]').stop().fadeIn(300);

                    $('.possibilities').removeClass('theme-partners');
                });
            }
        }
    });

    const startTimerAlert = () => {
        timerAlert = setTimeout(function () {
            $('.alert').removeClass('active')
        }, 3000)
    }

    const stopTimerAlert = () => {
        clearInterval(timerAlert);
    }

    let timerAlert;
    //add to shortlist
    $('.add-to-shortlist').on('click', function (e) {
        e.preventDefault();
        let myElm = $('#countInShortList');
        let myElm2 = $('#countInShortListMobile');

        if ($(this).text() == 'Added to Shortlist') {
            $(this).removeClass('active').text('Add to Shortlist');
            if (myElm.text() == 1) {
                myElm.text(0).removeClass('active');
                myElm2.text(0).removeClass('active');
            } else {
                myElm.text(parseInt(myElm.text()) - 1);
            }
        } else {
            $(this).addClass('active').text('Added to Shortlist');
            myElm.addClass('active')
            myElm2.addClass('active')
            myElm.text(parseInt(myElm.text()) + 1);
            $('.alert').addClass('active');
            if ($('.alert').hasClass('active')) {
                stopTimerAlert()
            }
            startTimerAlert()
        }
        myElm2.text()
        myElm2.text(myElm.text());
        myElm2.text()
    });

    //close alert after click
    $('.alert').click(function () {
        $(this).removeClass('active');
    });



    //tabs in search
    $('.search__menu-item').click(function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active').siblings().removeClass('active');
            let index = $(this).index();
            $('.search__tab.active').fadeOut(200, function () {
                $(this).removeClass('active')
                $('.search__tab').eq(index).css('display', 'grid').fadeIn(200, function () {
                    $(this).addClass('active')
                })
            })
        }
    });


    //tabs in empower
    $(function () {
        let timer1;
        let item = $('.empower__list-item');

        const startTimer = () => {
            timer1 = window.setInterval(switchTabs, 5000);
        }
        const stopTimer = () => {
            clearInterval(timer1);
        }

        item.click(function () {
            if (!$(this).hasClass('active')) {
                switchTabs($(this).index() + 1);
                $(this).nextAll().removeClass('active').removeClass('completed')
                $(this).addClass('active').removeClass('completed').prevAll().removeClass('active').addClass('completed')

                stopTimer();
                startTimer();
            }
        })

        startTimer();

        function switchTabs(index) {
            if (item.last().hasClass('completed')) {
                item.removeClass('completed').first().addClass('active');
                $('.empower__image.active').removeClass('active')
                $('.empower__image').first().addClass('active');
                $('.empower__bg').fadeOut(200, () => {
                    $('.empower__bg').removeClass('active').first().fadeIn(200, () => {
                        $('.empower__bg').first().addClass('active')
                    })
                })
            } else {
                $('.empower__list-item.active').addClass('completed').removeClass('active').next().addClass('active')
                if (!$('.empower__list-item').last().hasClass('completed')) {
                    if (Number.isInteger(index)) {
                        index--;
                        console.log(index);
                        $('.empower__image').removeClass('active').eq(index).addClass('active');
                        $('.empower__bg').stop(true, true).fadeOut(200, () => {
                            $('.empower__bg').removeClass('active').eq(index).stop(true, true).fadeIn(200, () => {
                                $('.empower__bg').eq(index).addClass('active');
                            })
                        })
                    } else {
                        $('.empower__image.active').removeClass('active').next().addClass('active');
                        $('.empower__bg.active').fadeOut(200, () => {
                            let tempItem = $('.empower__bg.active').next();
                            $('.empower__bg.active').removeClass('active').next().fadeIn(200, () => { 
                                tempItem.addClass('active')
                            }) 
                        })
                    }
                }
            }
        }
    });

    //tabs in do
    $(function () {
        let timer1;
        let item = $('.do__list-item');
        const mainElm = $('.do')

        const startTimer = () => {
            timer1 = window.setInterval(switchTabs, 5000);
        }

        const stopTimer = () => {
            clearInterval(timer1);
        }
        item.click(function () {
            if (!$(this).hasClass('active')) {
                switchTabs($(this).index() + 1);
                $(this).addClass('active').siblings().removeClass('active')

                stopTimer();
                startTimer();
            }
        })

        startTimer();

        function switchTabs(index) {
            if (Number.isInteger(index)) {
                mainElm.removeClass('do__bg-1').removeClass('do__bg-2').removeClass('do__bg-3').removeClass('do__bg-4').addClass('do__bg-' + index)
                $('.do__tab').removeClass('active').eq(index - 2).addClass('active')
            }
            if ($('.do__tab').last().hasClass('active')) {
                $('.do__tab').removeClass('active').first().addClass('active')
            } else {
                $('.do__tab.active').removeClass('active').next().addClass('active')
            }
        }

        function changeBG() {
            if (mainElm.hasClass('do__bg-1')) {
                mainElm.removeClass('do__bg-1').addClass('do__bg-2');
            } else if (mainElm.hasClass('do__bg-2')) {
                mainElm.removeClass('do__bg-2').addClass('do__bg-3');
            } else if (mainElm.hasClass('do__bg-3')) {
                mainElm.removeClass('do__bg-3').addClass('do__bg-4');
            } else if (mainElm.hasClass('do__bg-4')) {
                mainElm.removeClass('do__bg-4').addClass('do__bg-1');
            }
        }
        //list in do
        $('.do__list-item').on('animationend', function () {
            changeBG();
            if ($(this).hasClass('do__list-item-last')) {
                $(this).removeClass('active').parent().children(':first-child').addClass('active');
            } else {
                $(this).removeClass('active').next().addClass('active');
            }
            switchTabs()
        });
    });

    $('.prof__card-add').click(function () {
        $(this).toggleClass('prof__card-add-active');
    })


    /* sliders */
    $('#promoSlider').slick({
        slidesToShow: 7,
        slidesToScroll: 3,
        infinite: true,
        arrows: false,
        centerMode: true,
        autoplay: true,
        autoplaySpeed: 1600,
        responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerPadding: '50px'
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
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
        autoplay: true,
        autoplaySpeed: 4000,
        customPaging: (slider) => `<span></span>`,
        responsive: [{
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
                    slidesToShow: 1,
                }
            }
        ]
    });
    $(window).on('resize', function () {
        mySlider();
    });
    const mySlider = () => {
        if ($(window).width() < 769) {
            $('#rolesSlider:not(.slick-initialized)').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                infinite: false,
                arrows: false,
                dots: true,
                customPaging: (slider) => `<span></span>`,
            });
            $('#demandSlider:not(.slick-initialized)').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                infinite: false,
                arrows: false,
                dots: true,
                customPaging: (slider) => `<span></span>`,
            });
        } else {
            $("#rolesSlider").slick("unslick");
            $("#demandSlider").slick("unslick");
        }
    }
    mySlider();
});