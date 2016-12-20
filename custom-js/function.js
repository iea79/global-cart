$(document).ready(function() {
	/**
	 * <p>
	 *     <b class="icon-mobile"><span class="intphone">+7 (495) 645-68-77</span></b> 
	 *     <b class="icon-print">+7 (495) 645-68-99</b>
	 * </p>
	 */
	if (document.location.href.indexOf('utm_medium=cpc') > -1) {
		$('.intphone').text('+7 (499) 380-79-19');
		setCookie('phonescript3', '1', 'Mon, 01-Jan-2020 12:00:00 GMT', '/');
	};

	if (getCookie('phonescript3') === '1') {
		$('.intphone').text('+7 (499) 380-79-19');
	};

	$('.desktop').click(function() {
		$('.header,.content').toggleClass('fullwide');
	});

	$('.map-toggle-filter').click(function() {
		$(this).toggleClass('cahange');
		$('.map-wrapper .map-filter').toggleClass('filter-open');
		$('.map-wrapper').toggleClass('fullwide')
		$('.map-wrapper iframe').toggleClass('fullwide')
	});

	$('.grid-title .uk-icon-close').click(function() {
		$(this).parent().parent().parent().hide();
		$(this).parent().parent().parent().next().removeClass('uk-width-large-1-2 uk-width-large-1-3 uk-width-large-1-4 uk-width-large-2-3 uk-width-large-2-4 uk-width-large-3-4 ').addClass('uk-width-1-1');
	});

	$('.date-pick').pickmeup();

    var plus_5_days = new Date;
    plus_5_days.addDays(5);                                       
    
    $('.date-range').pickmeup({
        format: 'd/m/y',
        position        : 'bottom',
        hide_on_select  : true,
        date        : [
            new Date,
            plus_5_days
        ],
        mode        : 'range',
        calendars   : 2
    });
    
    $('#control-system').on('click', function() {
    	location.href = 'http://analytics.global-card.ru';
    });
    
    $('#id-demo-version').on('click', function() {
    	location.href = 'http://analytics.global-card.ru';
    });
    
    $('#old-version').on('click', function() {
    	location.href = 'http://old.global-card.ru';
    });
    
    $('#global-partner').on('click', function() {
    	location.href = '/sistema-kontrolya-rasxoda-topliva-gps';
    });
    
    $('#generate-route').on('click', function() {
    	location.href = 'http://old.global-card.ru/mapStations';
    });
        
    $('#new-control-level').on('click', function() {
    	location.href = '/video-content/r683_id/1/';
    });
    
    $('#id-find-more').on('click', function() {
    	location.href = '/publications/r630_id/3/';
    });
    
    var formError = $("#error-form").html();
	if (formError && formError.length > 0) {
		var modal = new $.UIkit.modal("#error-form");
		modal.show();
	}
	
	var formResponse = $("#response-form").html();
	if (formResponse && formResponse.length > 0) {
		var modal = new $.UIkit.modal("#response-form");
		modal.show();
	}
	
	function onOrderSent() {
		yaCounter22958149.reachGoal('sendorder');
		ga('send','event','sendgoal','sendorder','label',100);
	}

	function setCookie(name, value, expires, path, domain, secure) {
		document.cookie = name + "=" + escape(value) + ((expires) ? "; expires=" + expires : "")
			+ ((path) ? "; path=" + path : "")
			+ ((domain) ? "; domain=" + domain : "")
			+ ((secure) ? ";secure" : "");
	}

	function getCookie(name) {
		var cookie = " " + document.cookie;
		var search = " " + name + "=";
		var offset = 0;
		var end = 0;

		var setStr = null;
		if (cookie.length > 0) {
			offset = cookie.indexOf(search);
			if (offset != -1) {
				offset += search.length;
				end = cookie.indexOf(";", offset)
				if (end == -1) {
					end = cookie.length;
				}
				setStr = unescape(cookie.substring(offset, end));
			}
		}

		return (setStr);
	}

});