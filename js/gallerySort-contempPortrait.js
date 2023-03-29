
// ------------------------------------------------------------------*/

"use strict";

// /*------------------------------------------------------------------


//Version 1
document.querySelector("#contempPortrait").addEventListener("click", showContempPortrait);

function showContempPortrait() {
  window.location.href= "gallery.html";

  // [ Portfolio items & filtering ]
  // */
  jQuery(window).on("load", function(){
    jQuery('.filtering-wrap').each(function(){
      var $grid = jQuery(this).find('.items').isotope();

      if($grid.hasClass('masonry')){
        var $grid = jQuery(this).find('.items').isotope({
          itemSelector: '.item',
          masonry: {
            columnWidth: '.item'
          }
        });
      } else {
        var $grid = jQuery(this).find('.items').isotope({
          itemSelector: '.item'
        });
      }

      jQuery(this).find('.filter-button-group').on( 'click', 'button', function() {
        jQuery(this).addClass('active').siblings().removeClass('active');
        var filterValue = jQuery(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
      });
    });
  });

}
