(function() {
	var entry = $('.entry');
	var entry_height = entry.height();
	entry_height = parseInt(entry_height, 10);
	entry_height += 125; // include header and margin
	
	var viewport_height = $(window).height();
	viewport_height = parseInt(viewport_height, 10);
	
	var social_banner = $('.social-banner');
	var social_banner_original_height = social_banner.height();
	var social_banner_original_top = social_banner.css('top');
	
	social_banner_original_height = parseInt(social_banner_original_height);
	
	function animate_social_banner() {
		var scroll_top = $(this).scrollTop();
		scroll_top = parseInt(scroll_top, 10);
		
		var social_banner_top = parseInt(social_banner.css('top'));
		var scroll_offset = (viewport_height + scroll_top);

		if (scroll_offset > entry_height) {
			if (0 != social_banner_top) {
				console.log('starting animation');
				social_banner.clearQueue().animate({top: '0px'}, function() {
					console.log('animation complete');
				});
			}
		} else {
			if (-(social_banner_original_height) != social_banner_top) {
				social_banner.animate({top: social_banner_original_top});
			}
		}
	}

	$(document).scroll(animate_social_banner);
	$(document).ready(animate_social_banner);
	
	social_banner.find('input').click(function() {
		$(this).select();
	});
})();
