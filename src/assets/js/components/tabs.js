(function ($) {
  'use_strict';
  let doc = $(document);

  doc.ready(function () {

    /*
    * Tabs list
    * */
     if (doc.find('.tabs-list').length > 0 )  {

       let activeIndex =  doc.find('.active-tab').index(),
         contentbody = doc.find('.tabs-list__body'),
         tabsBody = doc.find('.tabs-list__nav > ul'),
         contentlis = contentbody.find('.tabs-list__content'),
         tabslist =  tabsBody.find('.tabs-list__nav-item');

       let elemPerPage = 8,
         defaultTabId = 'all',
         defaultActiveTab = doc.find(`.tabs-list__content[data-id='${defaultTabId}']`),
         defaultElemList = defaultActiveTab.find('.tab-content-container .tab-card');

       console.log({defaultElemList});

       defaultElemList.addClass('hide-card');
       defaultElemList.slice(0, elemPerPage).removeClass('hide-card');


       // click on tabs item
       doc.find('.tabs-list__nav > ul li').on('click', 'a', (e) => {
         e.preventDefault();
         let target = e.currentTarget,
           current = $(target),
           currentId = current.attr('data-id'),
           currentTab = contentbody.find(`.tabs-list__content[data-id='${currentId}']`),
           elemList = currentTab.find('.tab-content-container .tab-card'),
           elemListAmount = elemList.length > 0 ? elemList.length : 0;

         if ( currentTab.length > 0 ) {
           // remove active class
           tabslist.removeClass('active-tab');
           contentlis.removeClass('active-tab');
           currentTab.addClass("active-tab");
           current.parent().addClass('active-tab');

           currentTab.find(".load-more").removeClass('disabled');
           elemList.addClass('hide-card');
           elemList.slice(0, elemPerPage).removeClass('hide-card');
         }

       });

       // click on .tag-tab-link tags in the tab card elem
       doc.on('click', '.tag-tab-link', (e) => {
         e.preventDefault();
         let target = e.currentTarget,
           current = $(target),
           currentId = current.parents('.tab-card').attr('data-id'),
           currentTab = contentbody.find(`.tabs-list__content[data-id='${currentId}']`),
           elemList = currentTab.find('.tab-content-container .tab-card'),
           elemListAmount = elemList.length > 0 ? elemList.length : 0;

         if ( currentTab.length > 0 ) {
           // remove active class
           tabslist.removeClass('active-tab');
           contentlis.removeClass('active-tab');
           currentTab.addClass("active-tab");
           tabsBody.find(`.tabs-list__nav-item > a[data-id='${currentId}']`).parent().addClass("active-tab");

           currentTab.find(".load-more").removeClass('disabled');
           elemList.addClass('hide-card');
           elemList.slice(0, elemPerPage).removeClass('hide-card');

         }

       });

       // load more action for each tab
       doc.on('click', '.load-more', (e) => {
         e.preventDefault();
         let target = e.currentTarget,
           current = $(target),
           currentTab = current.parents('.tabs-list__content'),
           elemList = currentTab.find('.tab-content-container' +
           ' .tab-card'),
           elemListAmount = elemList.length > 0 ? elemList.length : 0;

         let showing = elemList.filter(':not(.hide-card)').length;
         //console.log({showing});

         elemList.slice(showing - 1, showing + elemPerPage).removeClass('hide-card');

         let nowShowing = elemList.filter(':visible').length;
         //console.log({showing, nowShowing, elemPerPage});

         if (nowShowing >= elemListAmount) {
           current.addClass('disabled');
         } else {
           current.removeClass('disabled');
         }


       });

     }



  });



})(jQuery);
