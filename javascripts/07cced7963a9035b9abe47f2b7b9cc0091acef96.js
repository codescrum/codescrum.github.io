(function($){
    "use strict";

    // Logo height fix
    //---------------------------------------------

    function height_line(height_object, height_donor){
        height_object.height(height_donor.height());
        height_object.css({
            "line-height": height_donor.height() + "px"
        });
    }

    $(document).ready(function(){
        height_line($(".nav-logo-wrap .logo"), $(".main-nav"));
    });


    // Home section height 100%
    //---------------------------------------------

    $(document).ready(function(){
        $(".js-height-full").height($(window).height());
    });

    $(window).resize(function(){
        $(".js-height-full").height($(window).height());
    });



    // Fittext (responsive text)
    //---------------------------------------------

    function fitTextInit(){
        $(".headings").fitText(2.43, {
            minFontSize: '24px',
            maxFontSize: '150px'
        });
        $(".slider-fittext").fitText(8.65, {
            minFontSize: '13px',
            maxFontSize: '30px'
        });

        $(".home-description").fitText(3.0, {
            minFontSize: '13px',
            maxFontSize: '20px'
        });

        $(".home-description.large").fitText(2.0, {
            minFontSize: '13px',
            maxFontSize: '30px'
        });

        $(".phone-number").fitText(1.07655, {
            minFontSize: '22px',
            maxFontSize: '80px'
        });
    }

    $(document).ready(function(){
        fitTextInit();
    });


    // Tooltips (bootstrap plugin activated)
    //---------------------------------------------

    $(document).ready(function(){

        $(".nav-social-links a").tooltip({
            placement: "bottom"
        });

        $(".social-links a").tooltip({
            placement: "top"
        });

        var is_touch_device = 'ontouchstart' in document.documentElement;
        if (!is_touch_device) {
            $(".contact-example-button").tooltip({
                placement: "right"
            });
        }
    });


    // Responsive menu
    //---------------------------------------------

    $(document).ready(function(){

        // Navbar sticky

        $(".main-nav").sticky({
            topSpacing: 0
        });


        var mobile_nav = $(".mobile-nav");
        var desktop_nav = $(".desktop-nav");

        height_line($(".inner-nav ul > li > a"), $(".main-nav"));
        height_line(mobile_nav, $(".main-nav"));

        mobile_nav.css({
            "width": $(".main-nav").height() + "px"
        });


        // Mobile menu style on

        $(window).resize(function(){
            if ($(window).width() < 1024) {
                $(".main-nav").addClass("mobile-on");
            }
            else
                if ($(window).width() >= 1024) {
                    $(".main-nav").removeClass("mobile-on");
                    desktop_nav.show();
                }
        });
        $(window).trigger("resize");


        // Mobile menu toggle

        mobile_nav.click(function(){

            if (desktop_nav.hasClass("js-opened")) {
                desktop_nav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
                $(this).removeClass("active");
            }
            else {
                desktop_nav.slideDown("slow", "easeOutQuart").addClass("js-opened");
                $(this).addClass("active");
            }

        });

        desktop_nav.find("a").click(function(){
            if (mobile_nav.hasClass("active")) {
                desktop_nav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
                mobile_nav.removeClass("active");
            }
        });

    });

})(jQuery);










