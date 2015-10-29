(function() {
  $(document).ready(function() {
    var businessHome;
    if ($(".thumbnails.yoxview").length > 0) {
      $(".thumbnails.yoxview").yoxview({
        lang: 'en',
        langFolder: '/vendor/js/yoxview/',
        imagesFolder: '/images/'
      });
    }
    if ($("body.cs-blog").length > 0) {
      businessHome = $.cookie('businessHome');
      if (businessHome === void 0) {
        businessHome = "";
      }
      $.each($(".inner-nav ul li"), function(index, value) {
        var a, href;
        a = $(value).children("a");
        href = a.attr('href');
        if (href.indexOf('http') === -1) {
          if (href.match(new RegExp("^#"))) {
            return a.prop("href", "/" + businessHome + href);
          }
        }
      });
      return;
    }
  });

}).call(this);
