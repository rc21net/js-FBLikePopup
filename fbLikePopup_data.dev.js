(function(){
// Для промокодов
var PromoCode = (function (){
		// список промокодов
		var promocodes = {
			'07072014': 'promocode1',
			'08072014':	'promocode2',
			'09072014':	'promocode3',
			'10072014':	'promocode4',
			'11072014':	'promocode5'
		};
		// текущая дата
		var currentDate = (function(){
			var d = new Date();
			var day = d.getDate();
			var month = d.getMonth();
			var year = d.getFullYear();
			if (day.toString().length < 2) day = '0'+day.toString();
			month++;
			if (month.toString().length < 2) month = '0'+month.toString();
			return day + month + year;
		})();

		return promocodes[currentDate] !== undefined ? promocodes[currentDate] : false;
	})();

// Popup Data
var popupData = {
	routs: [
		{
			pattern: /http:\/\/(www\.)?yoursite\.com\/(page1|page2|page3|page4|page5)\/.*/,
			object: 'promoCodes'
		},
		{
			pattern: /http:\/\/(www\.)?yoursite\.com\/(page6|page7|page8|page9|page10).*/,
			object: 'dataProduct'
		},
		{pattern: /.*/, object: 'dataCompany'}
	],
	promoCodes: {
		id : 'promoCodes',
		text : '<h2>Заголовок</h2>' +
		'<p>Текст</p>' +
		'<p style="text-align: center;"><a href="#" class="buyButton get-promo-code">Получить промокод</a></p>' +
		'<div class="undercut" style="display: none;">' +
		'<p style="text-align: center; margin: 15px 0;"><span class="promo-code" style="border: 2px solid #c60c30; padding: 5px 10px;"></span></p>' +
		'<p style="text-align: center; margin-bottom: 15px;"><a href="http://shop.yoursite.com/" class="buyButton go-to-shop">Перейти в магазин</a></p>' +
		'</div>',
		domain : 'yoursite.com',
		width : 580,
		height : 110,
		conditions : [
			{after_page_in_visit: 3, stop: true, custom: PromoCode}
		],
		likebox: ' ',
		gaq : {
			show : 'PopupShow',
			getPromo : 'GetPromo',
			goToShop : 'GoShopping',
			close : 'PopupClose'
		},
		ym : {
			show : '/promoPopup/open' + document.location.pathname,
			getPromo : '/promoPopup/getpromocode' + document.location.pathname,
			goToShop : '/promoPopup/gotoshop' + document.location.pathname,
			close : '/promoPopup/close' + document.location.pathname
		},
		gaFunction : function(gaq) {
			dataLayer = dataLayer || [];
			dataLayer.push({'OneDayDiscount': gaq, 'event': 'Popup'});
		},
		ymFunction : function(ym) {
			var yci = setInterval(function(){
				if (typeof yaCounterXXXXXX === 'undefined') return;
				clearInterval(yci);
				yaCounterXXXXXX.hit(ym);
			}, 10);
		},
		afterShowFunction: function(popup) {
			// клик по кнопке получить купон
			$('.get-promo-code').click(function(){
				$(this).fadeOut();
				$('.promo-code').text(PromoCode);
				$('.FBpopupDiv').animate({height: "435px", marginTop: "-216px"});
				$('.undercut').delay(300).fadeIn();
				var gaTrack = popup.data.gaq.getPromo;
				var ymTrack = popup.data.ym.getPromo
				popup.statistic(gaTrack, ymTrack);
			});
			// клик по кнопке перейти в магазин
			$('.go-to-shop').click(function(){
				var gaTrack = popup.data.gaq.goToShop;
				var ymTrack = popup.data.ym.goToShop
				popup.statistic(gaTrack, ymTrack);
			});
		}
	},
	dataCompany: {
		id : 'fbLikePopup_Company',
		text : '<p>Текст</p>',
		domain : 'yoursite.com',
		likePage : 'http://www.facebook.com/Company',
		gaq : {
			show : '/fb_like_Company/open' + document.location.pathname,
			like : '/fb_like_Company/like' + document.location.pathname,
			close : '/fb_like_Company/close' + document.location.pathname
		},
		ym : {
			show : '/fb_like_Company/open' + document.location.pathname,
			like : '/fb_like_Company/like' + document.location.pathname,
			close : '/fb_like_Company/close' + document.location.pathname
		},
		width : 414,
		height : 325,
		likeWidth : 400,
		likeHeight : 265,
		likeHeader : 'true',
		gaFunction : function(ga) {
			var gci = setInterval(function(){
				if (typeof _gaq === 'undefined') return;
				clearInterval(gci);
				_gaq.push(['_trackPageview', ga]);
			}, 10);
		},
		ymFunction : function(ym) {
			var yci = setInterval(function(){
				if (typeof yaCounterXXXXXX === 'undefined') return;
				clearInterval(yci);
				yaCounterXXXXXX.hit(ym);
			}, 10);
		},
		conditions : [
			{visit: 3, urls_include: /http:\/\/(www\.)?yoursite\.com\/promo.*/, no_show: true, no_count: true},
			{page_in_visit: 5, urls_include: /http:\/\/(www\.)?yoursite\.com\/promo.*/, no_show: true, no_count: true},
			{visit: 3, stop: true, urls_exclude: /http:\/\/(www\.)?yoursite\.com\/promo.*/},
			{page_in_visit: 5, stop: true, urls_exclude: /http:\/\/(www\.)?yoursite\.com\/promo.*/}
		]
	},
	dataProduct: {
		id : 'fbLikePopup_Product',
		text : '<p>Текст</p>',
		domain : 'yoursite.com',
		likePage : 'https://www.facebook.com/Product',
		gaq : {
			show : '/fb_like_Product/open' + document.location.pathname,
			like : '/fb_like_Product/like' + document.location.pathname,
			close : '/fb_like_Product/close' + document.location.pathname
		},
		ym : {
			show : '/fb_like_Product/open' + document.location.pathname,
			like : '/fb_like_Product/like' + document.location.pathname,
			close : '/fb_like_Product/close' + document.location.pathname
		},
		width : 414,
		height : 325,
		likeWidth : 400,
		likeHeight : 265,
		likeHeader : 'true',
		gaFunction : function(ga) {
			var gci = setInterval(function(){
				if (typeof _gaq === 'undefined') return;
				clearInterval(gci);
				_gaq.push(['_trackPageview', ga]);
			}, 10);
		},
		ymFunction : function(ym) {
			var yci = setInterval(function(){
				if (typeof yaCounterXXXXXX === 'undefined') return;
				clearInterval(yci);
				yaCounterXXXXXX.hit(ym);
			}, 10);
		},
		conditions : [
			{after_visit: 2, page_in_visit: 3, stop: true},
			{visit: 4, event: 'window.close', stop: true}
		]
	}
};

$(function(){
	// Popup Initialize
	var popup = new Popup();

	// FB Initialize
	window.fbAsyncInit = function() {
		FB.init({
					appId : '0000000000000000',
					status : true,
					cookie : true,
					xfbml : true
				});

		// Run on load
		popup.run(popupData);

		// LikeClick Handler
		FB.Event.subscribe('edge.create', function(response) {
			popup.close(true);
		});
	};

});

})();