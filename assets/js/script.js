//lazy load
const images = document.querySelectorAll('img.lazyload');

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
}

function handleImg(myImg, observer) {
    myImg.forEach(myImgSingle => {
        if (myImgSingle.intersectionRatio > 0) {
            loadImage(myImgSingle.target)
        }
    })
}

function loadImage(image) {
    // let extension = image.getAttribute('data-src').match(/\.([^.]+)$|$/)[1]
    // extension = image.getAttribute('data-src').split('.')[1]

    image.src = image.getAttribute('data-src')
    image.srcset = `${image.getAttribute('data-x2set')} x2`
    // image.srcset = `${image.getAttribute('data-src').split('.')[0]}_x2.${extension} 2x`
}
const observer = new IntersectionObserver(handleImg, options);

images.forEach(img => {
    observer.observe(img)
})

//remove #text in NodeList
let deleteTextNodes = function (a) {
    let ch = Array.from(a.childNodes);
    for (let i = 0; i < ch.length; i++) {
        ch[i].nodeType === 3 ? a.removeChild(ch[i]) : deleteTextNodes(ch[i]);
    }
};

$('.shortlist__label > input[type="checkbox"]').prop('checked', true)


$(document).ready(function () {
    /* SHORTLIST */

    // аккордеон шаблон
    const accTemplate = `<div class="shortlist__accordion new"> <label class="shortlist__label"> <input type="checkbox"> <span class="shortlist__checkmark"></span> </label> <div class="shortlist__accordion-text text">All</div> <div class="shortlist__accordion-amount"></div> <span class="shortlist__accordion-arrow"></span> </div>`;

    $('.shortlist__group-triger').click(function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active').children('span').text('Ungroup')

            $('.row-card').each(function () {

                let discipline_current = $(this).attr('data-discipline'), // дисципліна айтему
                    level_current = $(this).attr('data-level'), // левел айтему
                    title_new = level_current + ' ' + discipline_current, // змінна, якщо треба буде додати заголовок
                    title_current = $('.shortlist__accordion[data-discipline="' + discipline_current + '"][data-level="' + level_current + '"]') //пошук аккордеону з необхідними параметрами

                if (!title_current.length) {
                    //створити та присвоїти data атрибути поточної картки
                    $('.shortlist__row-cards').append(accTemplate)
                    $('.shortlist__row-cards').append('<div class="shortlist__list"></div>')
                    $('.new').attr('data-level', level_current).attr('data-discipline', discipline_current)
                    $('.new > .text').text(title_new); //змінити текст аккордеону
                    $('.new').next().append($(this)) //додати поточну картку до списку


                    //зміна заголовку для нового аккордеону
                    $(title_current).children('.text').text(title_new);

                    //присвоєння функції після для нового аккордеону
                    $('.new').click(function () {
                        $(this).toggleClass('active').next().stop(true, false).slideToggle(300);
                    });

                    $('.new').find('input[type="checkbox"]').click(function () {
                        let status_of_checkbox = $(this).prop('checked'),
                            temp_item = $(this).parent().parent().next().find('.shortlist__label > input[type="checkbox"]')

                        if (!status_of_checkbox) {
                            $(temp_item).prop('checked', false)

                            setTimeout(() => {
                                amount_of_partners()
                            }, 10);
                        } else {
                            $(temp_item).prop('checked', true)

                            setTimeout(() => {
                                amount_of_partners()
                            }, 10);
                        }
                    })


                    // активувати чекбокс, якщо всі картки в аккордеоні активні
                    if ($('.new').next().children().find('.shortlist__label > input[type="checkbox"]').prop('checked')) {
                        $('.new').find('input[type="checkbox"]').prop('checked', true)
                    } else {
                        $('.new').find('input[type="checkbox"]').prop('checked', false)
                    }
                    //забрати класс у нового аккордеону
                    $('.new').removeClass('new')
                }
                //додати картку
                $(this).appendTo(title_current.next());
            })

            $('.shortlist__accordion').each(function () {
                $(this).children('.shortlist__accordion-amount').text($(this).next().children().length)

            });
        } else {
            $(this).removeClass('active').children('span').text('Group by Industry')
            $('.row-card').each(function () {
                $('.shortlist__row-cards').append($(this))
            })
            $('.shortlist__accordion').remove()
            $('.shortlist__list').remove()
        }
    })


    const amount_of_partners = () => {
        let amount = 0
        $('.row-card__body > .shortlist__label > input[type="checkbox"]').each((i, elm) => {
            if ($(elm).prop('checked')) amount++
        })
        $('.amount__partners').text(amount)
    }
    amount_of_partners()

    $('.row-card__body > .shortlist__label > .shortlist__checkmark').click(function () {
        let temp_item = $(this).parent().parent().parent().parent().parent().prev(),
            siblings_card = $(this).parent().parent().parent().parent().parent().children().find('.shortlist__label > input[type="checkbox"]'),
            bool_value = true

        setTimeout(() => {
            if ($(temp_item).hasClass('shortlist__accordion')) {
                // $(temp_item).find('.shortlist__label > input[type="checkbox"]').prop('checked', false)

                $(siblings_card).each(function () {
                    // $(this).prop('checked', false)
                    if (!$(this).prop('checked')) {
                        bool_value = false
                    }
                })
                if (!bool_value) {
                    $(temp_item).find('.shortlist__label > input[type="checkbox"]').prop('checked', false)
                } else {
                    $(temp_item).find('.shortlist__label > input[type="checkbox"]').prop('checked', true)
                }
            }
        }, 10)


        setTimeout(() => {
            amount_of_partners()
        }, 10);
    })

    //log in account (header)
    $('.header__login > .btn').click(function (e) {
        e.preventDefault();

        $(this).parents().children('.btn:not(.header__shortlist)').fadeOut(400, function () {
            $(this).parents().siblings('.header__profile').fadeIn(300).css('display', 'flex');
        });
    });

    $('.header__search-link').click( function(e) {

        const text  = $(this).children('.header__search-title').text()

        $(this).parent().parent().siblings('span.text').text(text);
    });


    $('.nav-item-triger').hover(function () {
        $(this).children('.nav__dropdown').stop(true, false).slideDown(200)
    }/*, function () {
        $(this).children('.nav__dropdown').stop(true, false).slideUp(200)
    }*/);

    // $('.nav-item-triger').click( function () {
    //     console.log(1);
    //     $(this).children('.nav__dropdown').slideDown(200);
    // })
    // if (screen.width <= 768) {
    //     $('.nav-item-triger').off()
    // }

0    //filter rare dropdown
    $('.filter__rate-item').hover(function () {
        $(this).addClass('active').children('.filter__rate-list-wrapper').stop(true, true).slideDown(200)
    }, function () {
        $(this).removeClass('active').children('.filter__rate-list-wrapper').stop(true, true).slideUp(200)
    });

    $('.filter__rate-list-item').click(function () {
        const tempText = $(this).text()
        $(this).addClass('active').siblings().removeClass('active').parent().parent().siblings('.filter__rate-item-active').text(tempText)
    })

    //sort dropdown
    $('.catalog__sort').hover(() => {
        $('.catalog__sort-list').stop(true, true).slideDown(200).css('display', 'flex')
    }, () => {
        $('.catalog__sort-list').stop(true, true).slideUp(100)
    })

    //page see more
    $('.page__more').click(function () {
        $(this).toggleClass('page__more-active')

        if ($(this).hasClass('page__more-active')) {
            $('.page__projects:not(.page__projects-main)').slideDown(300)
            $(this).text('See less')
        } else {
            $('.page__projects:not(.page__projects-main)').slideUp(200)
            $(this).text('See all')
        }
    })

    //dropdown hover
    $('.dropdown-triger').hover(function () {
        $(this).children('.dropdown').stop(true, false).slideDown(200)
    }, function () {
        $(this).children('.dropdown').stop(true, false).slideUp(200)
    })
    //dropdown click
    $('.dropdown-triger-click').click(function () {
        $(this).children('.dropdown').stop(true, false).slideToggle(200)
    })

    //close dropdown
    $(document).click(function (e) {
        let ele = $(e.target);
        if (!ele.hasClass('dropdown-triger-click') &&
            !ele.hasClass('text')) {
            if (ele.hasClass('confirm__select-item')) {
                $('.dropdown').slideUp(200);
            } else {
                $('.dropdown').stop(true, false).slideUp(200);
            }
        }
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

//open filter
$('#filterTriger').click(function () {
    $('#filter').addClass('active')
    $('.overlayer').fadeIn(300)
})

//close filter
$('#filterClose').click(function () {
    $('#filter').removeClass('active')
    $('.overlayer').fadeOut(300)
})

//close all if click overlayer
$('.overlayer').click(function () {
    $(this).fadeOut(300)
    $('.nav').removeClass('active');
    $('.header__burger').removeClass('active')
    $('#filter').removeClass('active')
})

//sign window
$('.sign__triger').click(function () {
    $('.sign__inner.active').fadeOut(300, function () {
        $(this).removeClass('active').siblings(':not(.sign__recovery)').fadeIn(300).addClass('active');
    })
});

$('.form__recovery-triger').click(function () {
    $('.sign__inner.active').fadeOut(300, function () {
        $('.sign__recovery').fadeIn(300).addClass('active');
    })
});

// confirm window
$('.confirm__select-item').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    $(this).parent().siblings('span').removeClass('placeholder').text($(this).text())
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
    //let timer1;
    let item = $('.do__list-item');

    /*const startTimer = () => {
        //timer1 = window.setInterval(switchTabs, 0);
    }
    const stopTimer = () => {
        clearInterval(timer1);
    }*/
    item.click(function () {
        if (!$(this).hasClass('active')) {
            switchTabs($(this).index() + 1);
            $(this).addClass('active').siblings().removeClass('active')

            //stopTimer();
            //startTimer();
        }
    })

    //startTimer();

    function switchTabs(index) {
        let myItem = $('.do__bg');
        if (Number.isInteger(index)) {
            $('.do__tab').removeClass('active').eq(index - 2).addClass('active')
            index--;
            myItem.stop(true, false).fadeOut(300, () => {
                myItem.removeClass('active')
            }).eq(index).fadeIn(300, () => {
                myItem.eq(index).addClass('active')
            })
        } else {
            let n = $('.do__list-item.active').index();
            myItem.stop(true, false).fadeOut(300, () => {
                myItem.removeClass('active')
            }).eq(n).fadeIn(300, () => {
                myItem.eq(n).addClass('active')
            })
        }

        if ($('.do__tab').last().hasClass('active')) {
            $('.do__tab').removeClass('active').first().addClass('active')
        } else {
            $('.do__tab.active').removeClass('active').next().addClass('active')
        }

    }

    //list in do
    $('.do__list-item').on('animationend', function () {
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

$('#promoSlider').slick({
    slidesToShow: 7,
    slidesToScroll: 3,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1600,
    centerMode: true,
    variableWidth: true,
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
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 360,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 2,
            }
        }
    ]
});

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

function mySlider() {
    if ($(window).width() < 769) {
        $("#demandSlider").slick("setPosition");
        $('#rolesSlider').slick('setPosition');
        if (!$("#demandSlider").hasClass('slick-initialized')) {
            $("#demandSlider").slick('init')
        }
        if (!$('#rolesSlider').hasClass('slick-initialized')) {
            $('#rolesSlider').slick('init')
        }
    } else {
        if ($("#rolesSlider").hasClass('slick-initialized') || $("#demandSlider").hasClass('slick-initialized')) {
            $("#rolesSlider").slick("unslick");
            $("#demandSlider").slick("unslick");
        } else {
            $("#demandSlider").slick("setPosition");
        }
    }
}
$(window).on('resize', function () {
    mySlider();
});
$(window).on('load', function () {
    mySlider();
});
//change main theme
$('.promo__select-theme-item').click(function () {
    if (!$(this).hasClass('active')) {
        $(this).addClass('active').siblings().removeClass('active');

        if ($('.promo__select-theme-item:last-child').hasClass('active')) {
            $('*[data-theme="business"]').stop(true, false).fadeOut(300, function () {
                $('*[data-theme="partners"]').stop().fadeIn(300);
                $('.possibilities').addClass('theme-partners');

                mySlider();
                $('.partners-carousel').slick('setPosition');
                $('#rolesSlider').slick('setPosition');
            })
        } else {
            $('*[data-theme="partners"]').stop(true, false).fadeOut(300, function () {
                $('*[data-theme="business"]').stop().fadeIn(300);
                $('.possibilities').removeClass('theme-partners');
            });
        }
    }
    if ($(this).attr('id')) {}
});

//parallax
const paralax = document.getElementById("myParallax");

/* HERE CHANGE SCROLL SPEED*/
const moveCoef = 0.5;

window.addEventListener("scroll", scroll);
window.addEventListener("resize", scroll);
scroll();

function scroll() {
    if (!paralax) return
    let r = paralax.getBoundingClientRect();

    /* parallax center */
    let paralaxYCenter = r.y + r.height / 2;
    /* screen center */
    let scrollYCenter = window.innerHeight / 2;

    /* Calculate the offset */
    let move = (paralaxYCenter - scrollYCenter) * moveCoef - 100;

    paralax.style.transform = "translateY(" + (move - 300) + "px)";
};