(function($){
    "use strict";

    // Page loader
    //---------------------------------------------

    $('section#home').ready(function(){
        $(".page-loader b").stop(true).delay(100).fadeOut();
        $(".page-loader").stop(true).delay(400).fadeOut("slow");
    });
})(jQuery);
