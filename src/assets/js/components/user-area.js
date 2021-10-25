(function ($) {
  'use_strict';
  let doc = $(document);

  doc.ready(function () {

    if (doc.find('.user-area').length > 0 ) {
      const userArea = doc.find('.user-area');
      userArea.find('.user-info').on('click', (e) => {
        const target = e.currentTarget,
          current = $(target);
        if( userArea.find(".user-dropdown").hasClass( "u-open" ) ){
          userArea.find('.user-dropdown').removeClass("u-open");
          current.removeClass("u-open");
        } else {
          userArea.find('.user-dropdown').addClass("u-open");
          current.addClass("u-open");
        }
      });
    }



  });



})(jQuery);
