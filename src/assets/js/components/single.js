(function ($) {
  'use_strict';

  let doc = $(document);

  doc.ready(function () {
    // slider
    if ( doc.find('.features-slider__slider').length > 0 ) {
      doc.find('.features-slider__slider').slick({
        dots: false,
        arrow: true,
        infinite: true,
        speed: 500,
        fade: false,
        cssEase: 'linear',
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      });
    }

    // CSS Star Voting
    if ( doc.find('.ratings.form .star').length > 0 ) {
      let star = '.ratings.form .star',
        selected = '.selected';
      doc.find(star).on('click', function() {
        const parent = $(this).parents('.ratings.form');
        parent.find(selected).each(function(){
          $(this).removeClass('selected');
        });
        $(this).addClass('selected');
      });
    }

    if ( doc.find('.new-comment-action').length > 0 ) {
      doc.find('.new-comment-action').on('click', (e) => {
        e.preventDefault();
        let target = e.currentTarget,
          current = $(target),
          currentId = current.attr('data-id'),
          currentForm = doc.find(`.new-comment-form[data-id='${currentId}']`);
        currentForm.addClass('show');
      });
    }

    // Check if input, textarea has value
    if ( doc.find('.new-comment-form form').length > 0 ) {
      const form = doc.find('.new-comment-form form');
      form.find('input, textarea').on('keydown, keyup', (e) => {
        let current = $(e.currentTarget),
          submit =  current.parents('form').find('[type="submit"]');
        current.val() && submit.removeClass('disabled')
      });
    }

    // Response action for comments
    if ( doc.find('.response-button').length > 0 ) {
      doc.find('.response-button').on('click', (e) => {
        e.preventDefault();
        const current = $(e.currentTarget),
          body = current.parents('.comment-body'),
          replyId = current.attr('data-reply'),
          replyForm = doc.find(`.new-comment-form > .reply-form[data-id='${replyId}']`),
          newFrom = replyForm.clone();

        if ( current.hasClass('opened') ) {
          current.removeClass('opened');
          body.find(`.reply-form[data-id='${replyId}']`).remove();
        } else {
          current.addClass('opened');
          body.append(newFrom);
        }

      });
    }




    /*
     *  Custom like counter for posts
     * */
    doc.find( ".pp_like:not(.only_read)" ).on('click touchstart', function(e) {
      e.preventDefault();
      let _this = $(this),
        post_id = _this.data('id'),
        post_like = _this.parents('.post_like'),
        amount = post_like.find('span.counter').text(),
        post_like_count = amount ? parseInt(amount) : 0;

      post_like_count++;

      setTimeout(function () {
        let bubble =  post_like.find('.like-bubble');
        //bubble.text(like_count);
        bubble.text(1);
        bubble.addClass('is_animating');

        setTimeout(function () {
          let result = {
              likecount: post_like_count,
              like: 1,
              dislike: 0
            },
            likes = result.likecount;
          post_like.find('span.counter').text(likes);
          if( result.like === 1 ){
            post_like.find('.pp_like:not(.not_ip)').addClass('liked');
          }
          if( result.dislike === 1 ){
            _this.removeClass('liked');
          }
        }, 500);

      }, 500);

      setTimeout(() => {
        // post_like_count = 0;
      }, 800);

    });

    doc.find('.post_like').find('.like-bubble').on('animationend', function(){
      $(this).removeClass('is_animating');
    });
    // end --> Custom like counter for posts


  });



})(jQuery);
