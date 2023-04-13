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
    let extension = image.getAttribute('data-src').match(/\.([^.]+)$|$/)[1]
    // extension = image.getAttribute('data-src').split('.')[1]
    if (extension == 'svg') { // if this is a svg
        image.src = `${image.getAttribute('data-src')}`
    } else { // if this is not a svg
        if (image.getAttribute('data-x2set') == null) {
            image.src = `${image.getAttribute('data-src')}`
            $(image).removeAttr('data-x2set').removeAttr('data-set')
        } else {
            image.srcset = `${image.getAttribute('data-src')} 1x, ${image.getAttribute('data-x2set')} 2x`
        }
    }

    // image.src = image.getAttribute('data-src')
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

        $('.nav-mobile > .header__login').fadeOut(400, function () {
            $('.nav-mobile > .header__profile').fadeIn(300).css('display', 'flex');
        });
        $('.nav-item-no-login').fadeOut(400)
    });

    $('.header__search-link').click(function (e) {

        const text = $(this).children('.header__search-title').text()

        $(this).parent().parent().siblings('span.text').text(text);
    });


    if (window.innerWidth <= 1240) {
        $('.nav-item-triger').click(function () {
            const isActive = $(this).hasClass('active');

            $('.nav__dropdown').slideUp(200).parent().removeClass('active')
            if (isActive) {
                $(this).removeClass('active').children('.nav__dropdown').slideUp(200)
            } else {
                $(this).addClass('active').children('.nav__dropdown').slideDown(200)
            }
        })
    } else {
        $('.nav-item-triger').hover(function () {
            $(this).children('.nav__dropdown').stop(true, false).slideDown(200)
        }, function () {
            $(this).children('.nav__dropdown').stop(true, false).slideUp(200)
        });
    }
    if (window.innerWidth <= 991) {
        $('.header__search-select').click(function () {
            $(this).toggleClass('active').children('.header__search-dropdown').slideToggle(250)
        })
    }

    //filter rare dropdown
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
    $('.dropdown-triger:not(".no-hover")').hover(function () {
        $(this).children('.dropdown').stop(true, false).slideDown(200)
    }, function () {
        $(this).children('.dropdown').stop(true, false).slideUp(200)
    });
    //dropdown click
    $('.dropdown-triger-click').click(function (e) {
        e.stopPropagation()
        if ($(e.target).hasClass('smallDropdown__text')) {
            $(this).children('.dropdown').show(200)
        } else {
            $(this).children('.dropdown').stop(true, false).slideToggle(200)
        }
    });

    //close dropdown
    $(document).click(function (e) {
        let ele = $(e.target);

        let result = !$(ele).hasClass('dropdown-triger-click') &&
            !$(ele).hasClass('text') &&
            !$(ele).hasClass('builder__input') &&
            !$(ele).hasClass('custom-range') &&
            !$(ele).hasClass('dataSelector__inner') &&
            !$(ele).hasClass('weekTimeframes') &&
            !$(ele).hasClass('customSelect__current') &&
            !$(ele).hasClass('dataSelector__list') &&
            !$(ele).hasClass('dataSelector__item') &&
            !$(ele).hasClass('dataSelector__year') &&
            !$(ele).hasClass('dataSelector__current');

        if (result) {
            $('.dataSelector__current').removeClass('active')
            if ($(ele).hasClass('confirm__select-item')) {
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
    if ($(this).parent().parent().hasClass('builder__availability-select')) {
        $(this).parent().siblings('.label-focus').addClass('active');
    }
    $(this).parent().siblings('span.text').removeClass('placeholder').text($(this).text())
    $(this).parent().siblings('input').val($(this).text())

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

    //switching steps in profile builder after trigger click
    $('.builder__triger').click(function (e) {
        e.preventDefault();

        const currentStep = parseInt($(this).parent().attr('data-step-content')); //get current step

        $($(this).parent()).fadeOut(300, function () { //hide current content
            $(this).removeClass('active').next().fadeIn(300, function () {
                $(this).addClass('active').css('display', 'flex');
            }); //show next content
        })

        $(`[data-step="${currentStep}"]`).removeClass('builder__step-active').next().addClass('builder__step-active').prevAll().removeClass('builder__step-active').addClass('builder__step-confirm');
    })
    //switching steps in profile builder after step click
    $('[data-step]').click(function (e) {
        if (!$(this).hasClass('builder__step-confirm')) return 0; // cancel function if btn has not class '.builder__step-confirm'
        e.preventDefault();

        $(this).removeClass('builder__step-confirm').nextAll().removeClass('builder__step-active').removeClass('builder__step-confirm')
        $(this).prevAll().removeClass('builder__step-active').addClass('builder__step-confirm')

        $(this).addClass('builder__step-active')

        const currentStep = parseInt($(this).attr('data-step')); // get current index of step

        $('.active[data-step-content]').stop(true, false).fadeOut(300, function () {
            $(this).removeClass('active')
            $(`[data-step-content="${currentStep}"]`).stop(true, false).fadeIn(300).addClass('active')
        })
    })

    //counter
    $(".increment").click(function () {
        let input = $(this).siblings('input')
        let count = parseInt(input.val())

        count++
        input.val(count)
    });

    $(".decrement").click(function () {
        let input = $(this).siblings('input')
        let count = parseInt(input.val())

        count = count >= 1 ? count - 1 : 0;
        input.val(count)
    });

    $('.onlyInteger').on('keypress', function (e) {
        // get the character code from the event object
        const charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
        // convert the character code to a string
        const charStr = String.fromCharCode(charCode);
        // check if the character is a digit
        if (!charStr.match(/^[0-9]+$/)) {
            // if it's not a digit, prevent the default action
            e.preventDefault();
        }
    });

    $('.experiance-btn-switch').on('click', function () {
        $('.builder__experiance-inner.active').fadeOut(300, function () {
            $(this).removeClass('active').siblings().fadeIn(300).addClass('active');
        })
        if (!$('.builder__experiance-inner').last().hasClass('active')) {
            $('.builder__triger').attr('disabled', ' ');
            $('.builder__step').attr('disabled', ' ');
        } else {
            $('.builder__triger').removeAttr('disabled');
            $('.builder__step').removeAttr('disabled');
        }
    })
    /*************************/
    /* dragndrop             */
    /*************************/

    // Get elements
    const dropZone = $('.dragndrop'),
        dropZoneInput = dropZone.find('.dragndrop__input');


    // Handle the 'dragover' event
    $(document).on('dragover', function (e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.addClass('hover');
    });

    // Handle the 'dragleave' event
    $(document).on('dragleave', function (e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.removeClass('hover');
    });

    // Handle the 'drop' event
    $(document).on('drop', function (e) {
        e.preventDefault();
        e.stopPropagation();

        dropZone.removeClass('hover');
        const dropZoneInput = e.originalEvent.dataTransfer.files;

        if (dropZoneInput.length > 0) {
            dropZoneInput.value = dropZoneInput;

            dropZoneChageSlides()

            // server request
        }

        dropZone.removeClass('complete');
        dropZone.addClass('uploaded');
    });

    // Animete the drop zone
    const dropZoneChageSlides = function () {
        let curentContent = dropZone.find('.dragndrop__inner.active'),
            indexOfCurentContent = curentContent.attr('data-dragngdrop'),
            progresBar = dropZone.find('.dragndrop__loading-status'),
            percent = dropZone.find('.dragndrop__persentage > span')


        const show2Slide = function () {
            setTimeout(() => {
                let number = 0

                const timer = setInterval(() => {
                    number++
                    if (number > 100) {
                        clearInterval(timer)
                        setTimeout(() => { chandgeSlide() }, 600)
                    } else {
                        percent.text(number)
                        progresBar.css('width', `${number}%`)
                    }
                }, 12);

            }, 200);
        }

        if (indexOfCurentContent == "1") {
            chandgeSlide()
            show2Slide()

        } else if (indexOfCurentContent == "2") {
            return
        } else {
            dropZone.find('.dragndrop__inner.active').fadeOut(100, function () {
                $(this).removeClass('active')

                percent.text(0)
                progresBar.css('width', `${0}%`)

                $('[data-dragngdrop="2"]').fadeIn(100, function () {
                    $(this).addClass('active')
                })
                show2Slide()
            })
        }

        function chandgeSlide() {
            dropZone.find('.dragndrop__inner.active').fadeOut(100, function () {
                $(this).removeClass('active').next().fadeIn(100, function () {
                    $(this).addClass('active')
                    if ($('[data-dragngdrop="3"]').hasClass('active')) {
                        dropZone.removeClass('uploaded').addClass('complete')
                    }
                })
            })
        }
        // server request
    }

    // Add an event handler for file upload
    dropZoneInput.on('change', function () {
        dropZoneChageSlides()
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
    margin: 30,
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
    if ($(this).attr('id')) { }
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


// if screen width <= 576 off next functions
if (window.innerWidth <= 576) {
    $('.header__profile-select.dropdown-triger').addClass('no-hover')
}


//custom calendar
if ($('.input-date').length) {
    $('.input-date').datepicker();
}

//builder input
const inputs = $('.input-focus');

$.each(inputs, function (i, elm) {
    if ($(elm).val()) {
        $(elm).siblings('.label-focus').addClass('active')
    }
});

$('.input-focus').focus(function () {
    $(this).siblings('.label-focus').addClass('active')
    $(this).siblings('.dropdown').stop(false).slideDown(200)
})

$('.input-focus').focusout(function () {
    setTimeout(() => {
        if (!$(this).val()) {
            $(this).siblings('.label-focus').removeClass('active')
        }
    }, 100);
})

// video preview optimization
function findVideos() {
    let videos = $('.video');

    for (let i = 0; i < videos.length; i++) {
        setupVideo(videos[i]);
    }
}

function setupVideo(video) {
    let videoTitle = video.querySelector('.video__title');
    let videoLink = video.querySelector('.video__link');
    let videoMedia = video.querySelector('.video__media');
    let videoButton = video.querySelector('.video__button');
    let videoId = parseMediaURL(videoMedia);

    video.addEventListener('click', () => {
        let iframe = createIframe(videoId);

        videoLink.remove();
        videoTitle.remove();
        videoButton.remove();
        video.appendChild(iframe);
    });

    videoLink.removeAttribute('href');
    video.classList.add('video--enabled');
}

function parseMediaURL(videoMedia) {
    let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
    let url = videoMedia.src;
    let match = url.match(regexp);

    return match[1];
}

function createIframe(id) {
    let iframe = document.createElement('iframe');

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('src', generateURL(id));
    iframe.classList.add('video__media');

    return iframe;
}

function generateURL(id) {
    let query = '?rel=0&showinfo=0&autoplay=1';

    return 'https://www.youtube.com/embed/' + id + query;
}

findVideos();

/*************************/
/* TABS IN RESOURCES HUB */
/*************************/

// Hide all content blocks except the first one on page load
$('[data-tab-content]').not(':first-of-type').hide();

// On tab click
$('[data-tab]:not(.active)').click(function () {
    // Get tab id
    const tab_id = $(this).attr('data-tab');

    // Remove active class from all tabs
    $('[data-tab]').removeClass('active');

    // Add active class to clicked tab only
    $(this).addClass('active');

    // Hide all content blocks
    $('[data-tab-content]').hide();

    // Show content block corresponding to clicked tab
    $('[data-tab-content="' + tab_id + '"]').show();

    // Update page URL with hash
    window.location.hash = tab_id;

    // Prevent default action for button
    return;
});

// On page load, check hash and open corresponding tab
if (window.location.hash) {
    const tab_id = window.location.hash.substr(1);

    $('[data-tab="' + tab_id + '"]').click();
} else {
    $('[data-tab]:first-of-type').addClass('active');
    $(`[data-tab-content="${$('[data-tab]:first-of-type').attr('data-tab')}"]`).show();
}


// Popups

$(document).on('click', '.popup-trigger', function (e) {
    if ($(this).attr('data-popup')) {
        e.preventDefault();

        if ($(this).attr('data-type')) {
            $('.sign__inner').removeClass('active');
            $('.' + $(this).attr('data-type')).addClass('active');
        }

        if ($('#' + $(this).attr('data-popup')).length) {
            $('.nav').removeClass('active');
            $('.header__burger').removeClass('active')
            $('#filter').removeClass('active')
            $('.dropdown__active').removeClass('dropdown__active');
            $('body').addClass('noscroll');
            $('#' + $(this).attr('data-popup')).addClass('popup_active');
        }

    }
})
$(document).on('click', '.popup__bg, .popup__close, .popup__shut', function () {
    $('body').removeClass('noscroll');
    $('.popup').removeClass('popup_active');
})

// starsInput

$('.starsInput').click(function (e) {
    const x = e.pageX - $(this).offset().left;
    const widthStar = $(this).width() / 5;

    const rate = parseInt(x / widthStar) + 1;

    const cover = $(this).children('.cover')
    switch (rate) {
        case 1: cover.css('width', '80%'); break;
        case 2: cover.css('width', '60%'); break;
        case 3: cover.css('width', '40%'); break;
        case 4: cover.css('width', '20%'); break;
        case 5: cover.css('width', '0%'); break;
    }

    $(this).attr('data-rate', rate)
})


// timesheetLog

$(document).ready(function () {
    const timesheetLog = $('.timesheetLog') //find .timesheetLog

    timesheetLog.each(function () {
        const colHeight = $(this).parent().height() // get the height of one cell
        const interval = $(this).attr('data-interval') // get the interval

        $(this).css('min-height', `${colHeight * interval}px`); // set the min height of the current .timesheetLog
    })
})


// time ratio

$('.timeRatio__line').each(function () {
    $(this).width($(this).children('span').text() + '%')
})

//dataSelector

$('.dataSelector__current').on('click', function (e) {
    $('.dropdown').not($(this).siblings('.dropdown')).stop().slideUp(100)
    e.stopPropagation();
    $(this).toggleClass('active')
    $(this).siblings('.dropdown').slideToggle(200)
    $('.dataSelector__wrapper').hide()
    $('.dropdown__wrapper').show()
})
$('.dropdown__button').click(function () {

    let selector = $(this).parent().parent().parent().parent()

    if (selector.hasClass('dataSelector-filter')) {
        selector.find('.dataSelector__text').removeClass('dataSelector__text-placeholder').text($(this).text())
        $(this).parent().siblings().removeClass('active')
        $(this).parent().addClass('active')
    }

    if (!$(this).hasClass('custom-range') && !selector.hasClass('dataSelector-filter')) {
        selector.find('.dataSelector__current').text($(this).text())
        $(this).parent().siblings().removeClass('active')
        $(this).parent().addClass('active')
    }
})
$('.custom-range').click(function () {
    $(this).parent().parent().hide()
    $(this).parent().parent().siblings('.dataSelector__wrapper').show()
})
$('.dataSelector__item').click(function () {
    $(this).toggleClass('active').children().toggleClass('active')
})
$('.btn-dataSelector').click(function () {
    const activeItems = $(this).parent().parent().find('.dataSelector__item.active')
    const currentItem = $(this).parent().parent().parent().parent().find('.dataSelector__current')

    if (activeItems.first().attr('data-date-first') === undefined) return;

    let result = activeItems.first().attr('data-date-first') + ', '
        + activeItems.first().parent().attr('data-year')
        + ' - '
        + activeItems.last().attr('data-date-second') + ', '
        + activeItems.last().parent().attr('data-year')

    currentItem.text(result)

    $(this).parent().parent().parent().parent().find('.dropdown__item.active').removeClass('active')
    $(this).parent().parent().parent().parent().find('.dropdown__item').last().addClass('active')
})


//custom selected

if ($('.customSelect__current-tabs').length) {
    $('[data-selectoe-id]').hide()
    $('[data-selectoe-id=' + $('.customSelect__current-tabs').attr('data-id') + ']').show()
}

$(document).ready(function () {
    const customSelect = $('.customSelect');
    customSelect.each(function () {
        const selectedOption = $(this).find('.customSelect__current');
        const optionsList = $(this).find('.customSelect__options');
        const optionsListItem = $(this).find('li');
        const summary = $(this).parent().parent();

        selectedOption.on('click', function (e) {
            $('.dropdown').not($(this).siblings('.dropdown')).stop().slideUp(100)
            e.stopPropagation()
            optionsList.slideToggle(200);
        });

        optionsListItem.on('click', function (e) {
            e.stopPropagation()
            const clickedOption = $(this);
            const id = clickedOption.attr('data-id');
            const projectName = clickedOption.text();

            selectedOption.text(projectName);
            selectedOption.attr('data-id', id);
            customSelect.removeClass('open');

            if (selectedOption.hasClass('customSelect__current-tabs')) {
                $('[data-selectoe-id]').hide()
                $('[data-selectoe-id="' + clickedOption.attr('data-id') + '"]').show()
            }


            summary.find('.summary__project').hide()
            summary.find('.summary__project[data-id="' + id + '"]').show()
        });
    })
})


// summary

const summary = $('.summary')
summary.find('.summary__project').each(function () {
    $(this).find('.summary__diagram').last().show()
})
let projectId = summary.find('.customSelect__current').attr('data-id')
if (projectId === undefined) projectId = 1
$('.summary__project[data-id="' + projectId + '"]').show()
if ($('.summary__date.active.summary__date-last').length) $('.summary__btn-next').hide()
if ($('.summary__date.active.summary__date-first').length) $('.summary__btn-prev').hide()

$('.summary__btn').click(function (e) {
    const target = e.target
    let currentDate = $(this).siblings('.summary__date.active')
    const parent = $(this).parent()

    $(this).siblings('.summary__btn').show()

    currentDate.removeClass('active').hide()

    if ($(target).hasClass('summary__btn-prev')) {
        currentDate = currentDate.prev()
    }
    else if ($(target).hasClass('summary__btn-next')) {
        currentDate = currentDate.next()
    }

    if (currentDate.hasClass('summary__date-last')) $(this).hide()

    const id = currentDate.attr('data-id')

    currentDate.addClass('active').show()
    parent.attr('data-id', id)

    parent.siblings('.summary__diagram').hide()
    parent.siblings('.summary__diagram[data-id="' + id + '"]').show()
})


// groups

$('.group.active').children('.group__content').show()

$('.group__control').click(function (e) {

    if ($(this).parent().hasClass('active') &&
        $(e.target).hasClass('group__btn')) return;


    $(this).parent().toggleClass('active').children('.group__content').stop().slideToggle(300)
})

// ratings
