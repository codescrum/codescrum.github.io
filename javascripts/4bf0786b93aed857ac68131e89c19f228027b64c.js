(function() {
  $(document).ready(function() {
    return $(document).scroll(function() {
      if ($(document).scrollTop() > 40) {
        $('.cs-blog section.very-small-section').addClass('scrolled-mobile');
        if ($(window).width() < 360) {
          return $('.cs-blog section.very-small-section').addClass('scrolled-small-mobile');
        }
      } else {
        $('.cs-blog section.very-small-section').removeClass('scrolled-mobile');
        return $('.cs-blog section.very-small-section').removeClass('scrolled-small-mobile');
      }
    });
  });

}).call(this);
