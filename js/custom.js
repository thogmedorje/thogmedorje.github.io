jQuery(document).ready(function ($) {
    
    
    var tabCarousel;
    
    if($('.tabsGallery').length > 0){
        tabCarousel = setInterval(function() {
        var tabs = $('.tabsGallery #tabshp > li'),
            active = tabs.filter('.active'),
            next = active.next('li'),
            toClick = next.length ? next.find('a') : tabs.eq(0).find('a');

        toClick.trigger('click');
        }, 5000); 
    };


	$.each($('a[href$=".gif"], a[href$=".jpg"], a[href$=".png"], a[href$=".bmp"]'), function (i, elm) {
		var title = $(elm).find('img').attr('alt');
		if (title != '') {
			$(elm).attr('title', title);
		};
	});

	$('a[href$=".gif"], a[href$=".jpg"], a[href$=".png"], a[href$=".bmp"], a[rel="fancybox"]').attr('rel', 'fancybox').fancybox({
		theme: 'light',
		padding: 0, // space inside box, around content
		margin: [10, 20, 10, 20],
		helpers: {
			thumbs: true
		}
	});


	if (is_touch_device()) { //whether menu runs on touch device or not
		$('.top-menu>.menu-item-has-children>a').click(function (e) {
			if (!$(this).is('.visible')) {
				e.preventDefault();
			};
			$('.visible').removeClass('visible');

			var elm = $(this).next('div');
			elm.slideDown(200);

			$('.menu-arrow').remove();
			if (elm.is(":visible")) {
				elm.append('<div class="menu-arrow"></div>');
				$('.menu-arrow').css('left', ($(this).offset().left + $(this).width() / 2) - elm.offset().left - 10);
			}
			$(this).addClass('visible');
		});
	} else {
		$('.top-menu>.menu-item>a').hover(function () {
			var elm = $(this).next('div');

			$('#main-nav ul>li>div').not(elm).stop().slideUp(200);

			elm.slideDown(200);

			$('.menu-arrow').remove();
			if (elm.is(":visible")) {
				elm.append('<div class="menu-arrow"></div>');
				$('.menu-arrow').css('left', ($(this).offset().left + $(this).width() / 2) - elm.offset().left - 10);
			}

		});

		$('#main-nav').hover(function () {;
		}, function () {
			$('.menu-item-has-children div').stop().slideUp(200);
			$('.menu-arrow').remove();
		});
	}

	$('#menu-switch').click(function (e) {
		e.preventDefault();

		$('.top-menu').slideToggle('fast');

	});

	$('#lang').click(function (e) {
		e.preventDefault();
		$(this).children('div').slideToggle(200);
	});


	//TO-DO: rozšiřit o daší elementy menu
	$(document).mouseup(function (e) {

		var elements = [
			[$("#lang"), $("#lang").children('div')],
			[$('.menu-item-has-children div'), $('.menu-item-has-children').children('div')]
			]; //

		$.each(elements, function (i, elm) {

			if (!elm[0].is(e.target) // if the target of the click isn't the container...
				&& elm[0].has(e.target).length === 0) // ... nor a descendant of the container
			{
				elm[1].hide();
			}
		});
	});

	

	$('a').filter(function () {
		return this.hostname && this.hostname !== location.hostname;
	}).addClass("external").attr('target', '_blanc');


	$('time').each(function (i) {


		var d = new Date($(this).attr('datetime'));
		//console.log(d);

		if ($(this).attr('data-dateformat')) {
			$(this).html(date($(this).attr('data-dateformat'), d.getTime() / 1000));
		} else {
			$(this).html(d.toLocaleString() + ' (CET' + (d.getTimezoneOffset() / 60) + ')');
		}


		//e.html((d.toString().replace(/GMT.*/g,""));
	});


	if ($('#current-time').length > 0) {
		var updateTime = function () {
			var d = new Date();
			$('#current-time').html(d.toLocaleString() + ' (CET' + (d.getTimezoneOffset() / 60) + ')');
			setTimeout(updateTime, 1000);
		}
		updateTime();
	};

	/*
	$('time').localize({
		format: '%d %mmmm %yyyy, %hh:%MM\u2009%a',
		handler: function (dateString) {
			this.html(dateString + ' DEWACHEN');
		}
	})
	*/

	// post teaser tabs
	$("#tabs li, #tabshp li").click(function (e) {
        
        if (!e.isTrigger){
            clearInterval(tabCarousel);
        }
        
		e.preventDefault();

		$("#tabs li, #tabshp li").removeClass('active');

		$(this).addClass("active");

		$(".tab_content").hide();

		var selected_tab = $(this).find("a").attr("href");

		$(selected_tab).fadeIn();

		return false;
	});

	//$(window).resize(mysize);


}); //end ready


$(window).load(function () {
	//mysize();
});


function mysize() {


	if ($('#promo-2').length > 0) { //check if element exists
		check_overflow(
			$('#promo-2 .view .in'),
			$('#promo-2 .view').offset().left + $('#promo-2 .view').width(),
			$('#promo-2').offset().top + $('#promo-2').height(), []
		);
	};

	check_overflow(
		$('header .view #h1'),
		$('header').offset().left + $('header').width(),
		$('header #h1 img').offset().top + $('header #h1 img').height() + 20, [
			[$('#promo-1'), 1], //afect also given elements, with aplified effect - '1' gives same pace as model elelemt gets
			[$('#news-carousel article > div'), 1.3],
			[$('#news-carousel p'), 2.5],
			[$('#full-carousel'), 0.8],
			[$('.content'), 1.7],
			[$('.big-buttons'), 1],
		]
	);
}

function check_overflow(elm, parent_x, parent_y, elm_alt) {

	elm.parent().css('font-size', '100%');
	if (elm_alt.length > 0) {
		$.each(elm_alt, function (a, e) {
			e[0].css('font-size', '100%');
		});
	};

	var y = elm.offset().top + elm.height();
	var x = elm.offset().left + elm.width();

	//parent_y = parent_y.offset().top + parent_y.height();
	//parent_x = parent_x.offset().left +  parent_x.width();

	//$('#top').css('top', parent_y + 'px');
	//$('#left').css('left', parent_x + 'px');

	var i = 0;

	while ((y > parent_y || x > parent_x) && i < 100) {
		i++;
		//if(parseInt(elm.parent().css('font-size', 100 - i + '%').css('font-size')) > 12) {
		elm.parent().css('font-size', 100 - i + '%');
		//} else{
		//   elm.parent().css('font-size', '12px');
		//}
		y = elm.offset().top + elm.height();
		x = elm.offset().left + elm.width();
	}

	if (elm_alt.length > 0) {
		$.each(elm_alt, function (a, e) {
			e[0].css('font-size', 100 - (i / e[1]) + '%');
		});
	};

	return;
}

function is_touch_device() {
	return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
}

$(document).ready(function() {

if($('#progressBar').length < 0)
	return;

    
  var getMax = function(){
    return $(document).height() - $(window).height() - ($('footer').height() + $('#footer-nav').height());
  }
    
  var getValue = function(){
    return $(window).scrollTop();
  }
    
  if ('max' in document.createElement('progress')) {
    // Browser supports progress element
    var progressBar = $('progress');
        
    // Set the Max attr for the first time
    progressBar.attr({ max: getMax() });

    $(document).on('scroll', function(){
      // On scroll only Value attr needs to be calculated
      progressBar.attr({ value: getValue() });
    });
      
    $(window).resize(function(){
      // On resize, both Max/Value attr needs to be calculated
      progressBar.attr({ max: getMax(), value: getValue() });
    }); 
  
  } else {

    var progressBar = $('.progress-bar'), 
        max = getMax(), 
        value, width;
        
    var getWidth = function() {
      // Calculate width in percentage
      value = getValue();            
      width = (value/max) * 100;
      width = width + '%';
      return width;
    }
        
    var setWidth = function(){
      progressBar.css({ width: getWidth() });
    }
        
    $(document).on('scroll', setWidth);
    $(window).on('resize', function(){
      // Need to reset the Max attr
      max = getMax();
      setWidth();
		console.log('scroll');
    });
  }
});