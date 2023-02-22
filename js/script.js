/*------------------------------------------------------------------
[Master Scripts]

Project:    Stihiya template
Version:    1.0

[Table of contents]

[Components]
	-Preloader
	-Equal Height function
	-Full screen navigation open
	-Full screen navigation open
	-Fixed header
	-Screen rezise events
	-Screen resize
	-Fix centered container
	-Banner slider
	-Portfolio items & filtering
	-Blog items & filtering
	-Image carousel
	-Image carousel
	-Full sreen navigation
	-Animation
	-Animation
	-Load more
	-Coming soon countdown
	
-------------------------------------------------------------------*/

"use strict";

/*------------------------------------------------------------------
[ Preloader ]
*/
jQuery(window).on('load', function () {
    var $preloader = jQuery('#page-preloader'),
        $spinner   = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(350).fadeOut('slow');
});

jQuery(document).ready(function() {


	/*------------------------------------------------------------------
	[ Equal Height function ]
	*/
	function equalHeight(group) {
        if(jQuery(window).width() > '768') {
			var tallest = 0;
	       	jQuery(group).each(function() {
	            var thisHeight = jQuery(this).css('height', "").height();
	            if(thisHeight > tallest) {
	                tallest = thisHeight;
	            }
	        });
	        jQuery(group).height(tallest);
	    } else {
	    	jQuery(group).height('auto');
	    }
    }

    /*------------------------------------------------------------------
	[ Full screen navigation open ]
	*/
	jQuery('.full-screen-nav-button').on("click", function(){
		if (jQuery(this).hasClass('active')) {
			jQuery(this).removeClass('active');
			jQuery('.full-screen-nav').fadeOut();
		} else {
			jQuery(this).addClass('active');
			jQuery('.full-screen-nav').fadeIn();
			jQuery('.fsn-container .cell').css('height', jQuery('.fsn-container').height());
		};
	});

    /*------------------------------------------------------------------
	[ Full screen navigation open ]
	*/

	if(jQuery('#map').length > 0){
		function initialize() {
			var myLatlng = new google.maps.LatLng(51.522999, -0.157947);
			var mapOptions = {
				zoom: 16,
				center: myLatlng,
				disableDefaultUI: true,
				scrollwheel: false,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				styles: [{"featureType":"all","elementType":"all","stylers":[{"saturation":-100},{"gamma":1}]}]
			}
			var map = new google.maps.Map(document.getElementById("map"), mapOptions);

			var myLatLng = new google.maps.LatLng(51.522999, -0.157947);
			var beachMarker = new google.maps.Marker({
				position: myLatLng,
				map: map
			});
			google.maps.event.addDomListener(window, "resize", function() {
				var center = map.getCenter();
				google.maps.event.trigger(map, "resize");
				map.setCenter(center); 
			});
		}
		google.maps.event.addDomListener(window, 'load', initialize);
	}

	/*------------------------------------------------------------------
	[ Fixed header ]
	*/
	
	if(jQuery('.header').hasClass('transperent')){
		var h_class = 'transperent';
	}
	jQuery(window).on("load resize scroll", function(){
		if ( jQuery(document).scrollTop() > 0 ) {
			jQuery('.header').addClass('fixed').removeClass('transperent');
		} else {
			jQuery('.header').removeClass('fixed');
			if (h_class == 'transperent') {
				jQuery('.header').addClass('transperent');
			}
		}
	});

	/*------------------------------------------------------------------
	[ Screen rezise events ]
	*/
	
	jQuery(window).on("load resize scroll", function(){
		jQuery('.fsn-container .cell').css('height', jQuery('.fsn-container').height());
	});

	/*------------------------------------------------------------------
	[ Screen resize ]
	*/
	jQuery(window).on("load resize", function(){
		jQuery('.banner:not(.fixed-height)').each(function(){
			jQuery(this).css('height', jQuery(window).outerHeight());
			jQuery(this).find('.item').css('height', jQuery(window).outerHeight());
		});
		jQuery('.banner.fixed-height').each(function(){
			jQuery(this).find('.item').css('height', jQuery(this).height());
		});

		if(jQuery(window).width() > '768') {
	       	jQuery('.side-image').each(function() {
	            jQuery(this).css('height', jQuery(this).next('div').height());
	        });
	    } else {
	    	jQuery('.side-image').height('auto');
	    }

	    equalHeight(jQuery(".pricelist-items").find('.rows'));


	    equalHeight(jQuery(".fw-row:not(.masonry) .article-item2").find('.rows'));

	    equalHeight(jQuery(".category-item"));
	});

    /*------------------------------------------------------------------
	[ Fix centered container ]
	*/
	jQuery(window).on("load resize", function(){
		jQuery('.centered-container').each(function() {
			var width = parseInt(Math.round(jQuery(this).width()).toFixed(0)),
				height = parseInt(Math.round(jQuery(this).height()).toFixed(0));

			jQuery(this).css('width', '').css('height', '');

			if ( width & 1 ) {jQuery(this).css('width', (width+1)+'px');}

			if ( height & 1 ) {jQuery(this).css('height', (height+1)+'px');}
		});
	});

	/*------------------------------------------------------------------
	[ Banner slider ]
	*/
	jQuery('.banner').each(function(){
		if(jQuery(this).find('.item').length > 1){
			jQuery(this).owlCarousel({
				loop:true,
				items:1,
				nav: true,
				dots: false,
				autoplay: true,
				autoplayTimeout: 5000,
				autoplayHoverPause: true,
				navClass: ['owl-prev icon-font-back','owl-next icon-font-next'],
				navText: false
			});
		}
	});

	/*------------------------------------------------------------------
	[ Portfolio items & filtering ]
	*/
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

	/*------------------------------------------------------------------
	[ Blog items & filtering ]
	*/
	jQuery(window).on("load", function(){
		jQuery('.blog-items').each(function(){
			var $grid = jQuery(this).isotope();

			if($grid.hasClass('masonry')){
				var $grid = jQuery(this).isotope({
					itemSelector: '.item',
					masonry: {
						columnWidth: '.item'
					}
				});
			} else {
				var $grid = jQuery(this).isotope({
					itemSelector: '.item'
				});
			}

			jQuery(this).prev('.filter-button-group').on( 'click', 'button', function() {
				jQuery(this).addClass('active').siblings().removeClass('active');
				var filterValue = jQuery(this).attr('data-filter');
				$grid.isotope({ filter: filterValue });
			});
		});
	});

	/*------------------------------------------------------------------
	[ Image carousel ]
	*/
	if(jQuery('.image-carousel:not(.mini)').length > 0){
		jQuery('.image-carousel:not(.mini)').owlCarousel({
			loop:true,
			items:1,
			nav: false,
			dots: false,
			autoplay: true,
			autoplayTimeout: 5000,
			smartSpeed: 2000,
			autoplayHoverPause: true,
			navText: false,
			responsive:{
				0:{
					items:1
				},
				480:{
					items:2
				},
				768:{
					items:3
				},
				992:{
					items:4
				},
				1200:{
					items:6
				}
			}
		});
	}

	if(jQuery('.image-carousel.mini').length > 0){
		jQuery('.image-carousel.mini').owlCarousel({
			loop:true,
			items:1,
			nav: false,
			dots: false,
			autoplay: true,
			autoplayTimeout: 5000,
			smartSpeed: 2000,
			autoplayHoverPause: true,
			navText: false,
			responsive:{
				0:{
					items:2
				},
				650:{
					items:3
				},
				768:{
					items:5
				},
				992:{
					items:8
				},
				1200:{
					items:10
				},
				1400:{
					items:14
				}
			}
		});
	}

	/*------------------------------------------------------------------
	[ Image carousel ]
	*/
	if(jQuery('.testimonials-items').length > 0){
		jQuery('.testimonials-items').owlCarousel({
			loop:true,
			items:1,
			nav: true,
			dots: false,
			//autoplay: true,
			autoplayTimeout: 5000,
			autoplayHoverPause: true,
			navClass: ['owl-prev icon-font-back-4','owl-next icon-font-next-4'],
			navText: false,
			responsive:{
				0:{
					items:1
				},
				992:{
					items:2
				},
			}
		});
	}

	/*------------------------------------------------------------------
	[ Full sreen navigation ]
	*/
	
	jQuery(window).on("load resize", function(){
		jQuery('.full-screen-nav .menu-item-has-children > a').on("click", function(){
			if(!jQuery(this).hasClass('active')) {
				jQuery(this).addClass('active').parent().children('.sub-menu').slideDown().parent().siblings().children('a').removeClass('active').next('.sub-menu').slideUp();
				return false;
			}
		});
	});

	/*------------------------------------------------------------------
	[ Animation ]
	*/
	
	jQuery(window).on("load scroll", function(){
		jQuery('.animateNumber').each(function(){
			var num = parseInt(jQuery(this).attr('data-num'));
			
			var top = jQuery(document).scrollTop()+(jQuery(window).height());
			var pos_top = jQuery(this).offset().top;
			if (top > pos_top && !jQuery(this).hasClass('active')) {
				jQuery(this).addClass('active').animateNumber({ number: num },2000);
			}
		});
		jQuery('.animateProcent').each(function(){
			var num = parseInt(jQuery(this).attr('data-num'));
			var percent_number_step = jQuery.animateNumber.numberStepFactories.append('%');
			var top = jQuery(document).scrollTop()+(jQuery(window).height());
			var pos_top = jQuery(this).offset().top;
			if (top > pos_top && !jQuery(this).hasClass('active')) {
				jQuery(this).addClass('active').animateNumber({ number: num, numberStep: percent_number_step },2000);
			}
		});
	});

	/*------------------------------------------------------------------
	[ Animation ]
	*/
	
	jQuery('.rating-item').find('.line').find('div').css('width', '0%');
	jQuery(window).on("load scroll", function(){
		jQuery('.rating-item').each(function(){
			var num = parseInt(jQuery(this).find('.line div').attr('data-value')),
				top = jQuery(document).scrollTop()+(jQuery(window).height()),
				pos_top = jQuery(this).offset().top;

			if (top > pos_top && !jQuery(this).hasClass('active')) {
				jQuery(this).addClass('active').find('.line div').css('width', num+'%');
			}
		});
	});

	/*------------------------------------------------------------------
	[ Load more ]
	*/

	if(jQuery('.load-items').length > 0) {
		var button = 0;
		jQuery('.load-button a').on('click', function() {
			var id = jQuery(this).attr('data-id'),
				el = jQuery('.load-items-id'+id),
				cout_pages = el.length;
			button++;
			if(cout_pages == 1) {
				jQuery(this).parent('.load-button').fadeOut();
			}
			var $items = jQuery('.load-items-id'+id+'.load-items-page'+button).find('.item');
			if(jQuery(this).parent().hasClass('filter') || jQuery(this).parent().hasClass('masonry')) {
  				jQuery('.load-items-id'+id+'.load-items-page'+button).parent().append( $items ).isotope( 'appended', $items );
  				jQuery('.load-items-id'+id+'.load-items-page'+button).remove();
			} else {
				jQuery('.load-items-id'+id+'.load-items-page'+button).parent().append( $items );
				jQuery('.load-items-id'+id+'.load-items-page'+button).remove();
			}
			return false;
		});
	}

    /*------------------------------------------------------------------
	[ Coming soon countdown ]
	*/
	if(jQuery('#countdown').length > 0){
		jQuery('#countdown').countdown({
			timestamp	: (new Date()).getTime() + 10*24*60*60*1000,
			callback	: function(days, hours, minutes, seconds){
			}
		});
	}
});