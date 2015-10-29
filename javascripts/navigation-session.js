(function($){
  "use strict";
  $(document).ready(function(){
    $('.home .business-boxes-container a.cs-link').on( "click", function() {
      var businessHome = $(this).attr('href').replace('/', '');
      document.cookie="businessHome=" + businessHome + "; expires=Thu, 18 Dec " + (new Date().getFullYear() + 3) + " 12:00:00 UTC; path=/";
    });
  });
})(jQuery);
