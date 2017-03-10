// Global parameters
window.params = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent)
};


/**
     *
     * Check if element exist on page
     *
     * @param el {string} jQuery object (#popup)
     *
     * @return {bool}
     *
*/
function exist(el){
    if ( $(el).length > 0 ) {
        return true;
    } else {
        return false;
    }
}


jQuery(document).ready(function($) {

    var toggleBlocks = function(){
        var colorSamlpes = $('.swatch-color-container'),
            colorPicked = $('.color-picked');
            colorSamlpes.toggleClass('shown');
            colorPicked.toggleClass('shown');
    };


    var setColors = function(el, move){
        var parent =  $('.swatch-color-container'),
            currentEl = parent.children().eq(el),
            currentElName = $(currentEl).find('h2').text(),
            currentElColor = $(currentEl).css('background-color'),
            bigSample = $('.color-picked__main'),
            num = 1;

            if(!move) { 
                for ( i = el-5; i <= el; i++ ) {
                    var color = '';
                    function setSiblings(){
                        color = parent.children().eq(i).css('background-color');
                        $('.color-picked__siblings a:nth-child(' + num + ')').css('background-color', color);
                        $('.color-picked__siblings a:nth-child(' + num + ')').attr('index', i);
                    }
                    setSiblings();
                    num++;
                }
            } 

            bigSample.css('background-color', currentElColor);
            $('.illustrated-title').children('span').text(currentElName);
    };


    var lastPosition = '';
    var lastPositionGap = '';
    var goTop = function(el){
        if ($(window).width() < 1200) {
           var topOfBlock = $('.illustrated-title').offset().top;
        }
        else {
           var topOfBlock = $('.tabs-controls').offset().top;
        }
        var scrolled = $(window).scrollTop();

        lastPositionGap = $(el).offset().top - scrolled;
        lastPosition = $(el).offset().top;

            if (topOfBlock < scrolled) {
                $('html, body').animate({
                    scrollTop: topOfBlock
                }, 800);
            }
    };


    var goDown = function() {
        $('html, body').animate({
            scrollTop: lastPosition - lastPositionGap
        }, 400);
    };


    $('.swatch-color').click(function(e){
        e.preventDefault();
        var ind = $(this).index();
        setColors(ind);
        toggleBlocks();
        goTop(this);
    });

    $('.color-picked__siblings a').click(function(e){
        e.preventDefault();
        var ind = $(this).attr('index');
        setColors(ind, 'no-move');
    });

    $('.color-picked__main .title').click(function(){
        toggleBlocks();
        goDown();
    });

    /*---------------------------
                                  ADD CLASS ON SCROLL
    ---------------------------*/
    $(function() { 
        var $document = $(document),
            $element = $('.menu-button'),
            $element2 = $('header'),
            className = 'hasScrolled';

        $document.scroll(function() {
            $element.toggleClass(className, $document.scrollTop() >= 1);
            $element2.toggleClass(className, $document.scrollTop() >= 1);
        });
    });
    
    /*---------------------------
                                PAGE ANCHORS
    ---------------------------*/
    $('.mainNav a, .anchor').click(function() {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 50
        }, 800);
        return false;
    });

    /*---------------------------
                                  MENU TOGGLE
    ---------------------------*/
    $('.menu-button').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('active');
        $(this).siblings('header').toggleClass('active');
        if ($('header').hasClass('active')) {
                $('body').css('overflow', 'hidden');
            } else {
                $('body').css('overflow', 'visible');
            }
    });



    /*---------------------------
                                  Tabs
    ---------------------------*/
    if ( exist('.tabs') ) {
        $('.tabs').tabs();
    }


    /*---------------------------
                                  Magnific popup
    ---------------------------*/
    $('.magnific').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',
        modal: false,

        closeBtnInside: true,
        preloader: false,
        
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });


    $('.offer--slider').slick({
        fade: true,
        arrows: true,
        dots: false,
        speed: 900,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: false
    });

    /*---------------------------
                                  Sliders
    ---------------------------*/
    $('.partners-slider').on('init', function(event, slick){
        $(this).css({
            opacity: 1,
            visibility: 'visible'
        })
    });
    $('.partners-slider').slick({
        arrows: false,
        dots: false,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        speed: 5000,
        autoplaySpeed: 0,
        easing: 'linear',
        pauseOnHover: false,
        pauseOnFocus: false,
        draggable: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }
        ]
    })




    $('.cargo-slider').slick({
        arrows: false,
        dots: false,
        fade: true,
        asNavFor: '.cargo-slider-thumbnails'
    })

    $('.cargo-slider-thumbnails').slick({
        arrows: false,
        dots: false,
        focusOnSelect: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.cargo-slider',
        responsive: [
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            }
        ]
    })




    if ( exist('.gallery-item') ) {
        $('.gallery-item').each(function(index, el) {
            $(this).attr('data-slide-index', index);
        });    
    }
    
    $('.gallery-item').on('click', function(event) {
        event.preventDefault();
        $('.gallery-slider').slick('slickGoTo', $(this).attr('data-slide-index') );
        $('.gallery-slider').slick('setPosition');
        $('.gallery-slider-thumbnails').slick('setPosition');
        $('#grid-gallery').addClass('active');
    });

    $('.fiber-features-item').on('click', function(event) {
        event.preventDefault();
        $('.gallery-slider').slick('slickGoTo', 0);
        $('.gallery-slider').slick('setPosition');
        $('.gallery-slider-thumbnails').slick('setPosition');
        $('#fiber-features-gallery-' + $(this).attr('data-gallery-index') ).addClass('active');
    });

    $('.close-gallery').on('click', function(event) {
        event.preventDefault();
        $('.lightbox-slider').removeClass('active');
    });

    $('.gallery-slider').slick({
        arrows: true,
        dots: false,
        fade: true,
        lazyLoad: 'ondemand',
        asNavFor: '.gallery-slider-thumbnails'
    })
    $('.gallery-slider-thumbnails').slick({
        arrows: false,
        dots: false,
        focusOnSelect: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        lazyLoad: 'ondemand',
        asNavFor: '.gallery-slider'
    })


    /*----------------------------
                              SEND FORM
    -------------------------*/
    /**
     *
     * Open popup
     *
     * @param popup {String} jQuery object (#popup)
     *
     * @return n/a
     *
    */
    function openPopup(popup){
        $.magnificPopup.open({
            items: {
              src: popup
            },
            type: 'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            modal: false,
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-slide-bottom'
        }, 0);
    }

    $('.form').on('submit', function(event) {
        event.preventDefault();
        var data = new FormData(this);
        $(this).find('button').prop('disabled', true);
        $.ajax({
            url: theme.url + '/forms.php',
            type: 'POST',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: function(result) {
                if (result.status == 'ok') {
                    openPopup('#modal-popup-ok')
                } else {
                    openPopup('#modal-popup-error')
                }
            },
            error: function(result) {
                openPopup('#modal-popup-error');
            }
        }).always(function() {
            $('form').each(function(index, el) {
                $(this)[0].reset();
                $(this).find('button').prop('disabled', false);
            });
        });
    });



    /*Google map init*/
    var map;
    function googleMap_initialize() {
        var lat = $('#map_canvas').data('lat');
        var long = $('#map_canvas').data('lng');

        var mapCenterCoord = new google.maps.LatLng(lat, long);
        var mapMarkerCoord = new google.maps.LatLng(lat, long);

        var mapOptions = {
            center: mapCenterCoord,
            zoom: 14,
            //draggable: false,
            disableDefaultUI: false,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
        var markerImage = new google.maps.MarkerImage('images/location.png');
        var marker = new google.maps.Marker({
            icon: markerImage,
            position: mapMarkerCoord, 
            map: map,
            title:"Чисто Строй"
        });
        
        $(window).resize(function (){
            map.setCenter(mapCenterCoord);
        });
    }

    if ( exist( '#map_canvas' ) ) {
        googleMap_initialize();
    }

}); // end file