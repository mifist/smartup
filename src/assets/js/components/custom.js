(function ($) {
    'use_strict';

  let doc = $(document);

    $.fn.equalHeight = function () {
        let tallest = 0;
        this.each(function () {
            let thisHeight = $(this).height();
            tallest = (thisHeight > tallest) ? thisHeight : tallest;
        });
        return this.height(tallest);
    };

    let is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
    let is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
    let is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
    let is_safari = navigator.userAgent.indexOf("Safari") > -1;
    let is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
    if ((is_chrome) && (is_safari)) {
        is_safari = false;
    }
    if ((is_chrome) && (is_opera)) {
        is_chrome = false;
    }

    const getUrlVars = () => {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });
        return vars;
    };

    var url_vars = getUrlVars();


  /**
   * Preloader
   * */
  window.addEventListener("load", () => {
    let preloaderGroup = document.getElementById("preloaderGroup");

    if ( preloaderGroup ) {
      console.log(preloaderGroup);
      preloaderGroup.classList.add("vanish");
      setTimeout(() => {
        preloaderGroup.style.display = "none";
      }, 500);
    }
  });
  // END - Preloader


    $(document).ready(function () {

 /*       if (navigator.userAgent.indexOf('Mac') > 0)
            $('body').addClass('mac-os');*/

        // Show/Hide password in the forms
      $(document).find(".toggle-password").click((e) => {
        e.preventDefault();
        console.log('Show/Hide password toggle');

        let target = e.currentTarget,
          current = $(target),
          input = current.parents('.password-field').find("input");
        if (input.attr("type") === "password") {
          current.addClass('show');
          input.attr("type", "text");
        } else {
          current.removeClass('show');
          input.attr("type", "password");
        }
      });

      // Modals
      doc.find('.open-modal').on('click', (e) => {
        e.preventDefault();
        const current = $(e.currentTarget),
          currentId = current.attr('data-id'),
          currentWind = doc.find(`.modal[data-id='${currentId}']`);

        if ( currentWind.length > 0 ) {
          if ( currentWind.hasClass('hide') ) {
            currentWind.removeClass('hide');
          }
        }

      });

      doc.find('.close-modal').on('click', (e) => {
        e.preventDefault();
        const current = $(e.currentTarget),
          currentId = current.attr('data-id'),
          currentWind = doc.find(`.modal[data-id='${currentId}']`);

        if ( currentWind.length > 0 ) {
          if ( !currentWind.hasClass('hide') ) {
            currentWind.addClass('hide');
          }
        }

      });


    });

    $(window).on('ready resize orientationChange', function () {
    });






})(jQuery);


/*if (window.matchMedia("(min-width: 1024px)").matches) {


}*/


