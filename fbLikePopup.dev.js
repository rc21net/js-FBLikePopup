
/**
 * Popup
 * @class Класс позволяет создавать объекты для показа на страницах всплывающих окон c плагином фейсбука LikeBox.
 * Попап может быть показан при загрузке страницы, ее закрытии и любом другом действии.
 * Попап может быть показан при соблюдении определенных условий: количество просмотров, визитов, показов, дней после показа и т.д.
 * После инициализации запускается методом run(), которому передается объект данных (объект с настройками) и (опционально) функция выполняемая по завершению приложения.
 * @constructor
 */
function Popup(){
	/**
	 * Объект данных
	 * @type Object
	 */
	this.data = null;


	// Попап и его элементы
	/**
	 * Попап (как DOM-элемент)
	 * @type HTMLElement
	 */
	this.popupDiv = undefined;
	/**
	 * Кнопка закрытия попапа
	 * @type HTMLElement
	 */
	this.closeButton = undefined;
	/**
	 * LikeBox в виде строки
	 * @type String
	 */
	this.likebox = undefined;
	/**
	 * DOM-элемент тригер для события закрытия окна
	 * @type HTMLElement
	 */
	this.windowCloseElement = undefined;

	// Callback Functions
	/**
	 * Функция, вызываемая после завершения приложения (если передана)
	 * @type Function
	 */
	this.callbackFunction = undefined;
	/**
	 * Функция, вызываемая до показа попапа
	 * @type Function
	 */
	this.beforeShowFunction = undefined;
	/**
	 * Функция, вызываемая после показа (открытия) попапа
	 * @type Function
	 */
	this.afterShowFunction = undefined;


	// Настройки содержимого попапа
	/**
	 * Идентификатор попапа
	 * @type String
	 */
	this.id = undefined;
	/**
	 * Текст перед социальным плагином
	 * @type String
	 */
	this.text = undefined;
	/**
	 * Ширина попапа
	 * @type Number
	 */
	this.width = undefined;
	/**
	 * Высота попапа
	 * @type Number
	 */
	this.height = undefined;
	/**
	 * URL страницы для LikeBox
	 * @type String
	 */
	this.likePage = undefined;
	/**
	 * Ширина LikeBox
	 * @type Number
	 */
	this.likeWidth = undefined;
	/**
	 * Высота LikeBox
	 * @type Number
	 */
	this.likeHeight = undefined;
	/**
	 * Настройка LikeBox: показывать фото ('true') или нет ('false')
	 * @type String
	 */
	this.likeShowFace = undefined;
	/**
	 * Настройка LikeBox: показывать комментарии ('true') или нет ('false')
	 * @type String
	 */
	this.likeStream = undefined;
	/**
	 * Настройка LikeBox: показывать заголовок ('true') или нет ('false')
	 * @type String
	 */
	this.likeHeader = undefined;
	/**
	 * Тип анимации: 'Up' - появление снизу, 'Fade' - проявление
	 * @type String
	 */
	this.anim = undefined;
	/**
	 * Не использовать Facebook
	 * @type Boolean
	 */
	this.noFB = false;

	// Настройки условий
	/**
	 * Массив условий
	 * @type Array
	 * @example Возможные условия:
	 * <pre>
	 * urls_include - показать на указанных урлах (RegExp),
	 * urls_exclude - не показывать на указанных урлах (RegExp),
	 * visit - показать на конкретный визит,
	 * after_visit - показать после визита,
	 * page_in_visit - показать на конкретный просмотр страницы в рамках визита,
	 * after_page_in_visit - показать после просмотра страницы в рамках визита,
	 * page - показать на конкретный просмотр страницы (без учета визитов),
	 * after_page - показать после просмотра страницы (без учета визитов),
	 * show - показать на конкретный показа (т.е. правило сработает если было указанное количество показов),
	 * after_show - показать после показа,
	 * day_after_close - показать по прошествии указанного количества дней после закрытия,
	 * stop - больше не показывать (ни одно из условий выполняться не будет),
	 * stop_count_views - больше не считать просмотры,
	 * stop_count_shows - больше не считать показы,
	 * no_show - не показывать попап,
	 * no_count - не считать (не сохранять в куку) визиты и прочее,
	 * event - показать по событию: т.е. загрузка и инициализация приложения
	 * 	(включая поиск исловия и подсчет показов/просмотров)
	 * 	произойдет по одному событию (например, загрузка страницы),
	 * 	а показан попап будет по другому событию. Возможные значения:
	 * 	'windiw.close' - попап будет показан по закрытию окна,
	 * 	true - попап будет показан по событию,
	 * 	по которому будет вызвана Popup.show()
	 * </pre>
	 */
	this.conditions = undefined;
	/**
	 * Настройки: считать просмотры (true) или нет (false)
	 * @type Boolean
	 */
	this.countViews = undefined;
	/**
	 * Настройки: считать показы (true) или нет (false)
	 * @type Boolean
	 */
	this.countShows = undefined;


	// Настройки статистики
	/**
	 * Объект с треками для гугл аналитекс
	 * Свойства объекта:
	 * show - трек для показа попапа
	 * like - трек для клика по кнопке лайк
	 * close - трек клика по кнопке закрыть
	 * @type Object
	 */
	this.gaq = undefined;
	/**
	 * Объект с треками для яндекс метрики
	 * Свойства объекта:
	 * show - трек для показа попапа
	 * like - трек для клика по кнопке лайк
	 * close - трек клика по кнопке закрыть
	 * @type Object
	 */
	this.ym = undefined;
	/**
	 * Функция трекера гугл аналитекс
	 * @type Function
	 */
	this.gaFunction = undefined;
	/**
	 * Функция трекера яндекс метрики
	 * @type Function
	 */
	this.ymFunction = undefined;


	// Куки
	/**
	 * Кука состояния|количества показов
	 * @type String|Number
	 */
	this.cookie = undefined;
	/**
	 * Домен (используется в куках)
	 * @type String
	 */
	this.domain = undefined;
	/**
	 * Суффикс имени куки визитов
	 * @type String
	 */
	this.visitCookieSuffix = '_visit';
	/**
	 * Суффикс имени куки просмотренных страниц в рамках визита
	 * @type String
	 */
	this.pageCookieSuffix = '_page';
	/**
	 * Суффикс имени куки просмотренных страниц (без учета визитов)
	 * @type String
	 */
	this.totalpageCookieSuffix = '_totalpage';
	/**
	 * Суффикс имени куки визита (если установлена визиты не увеличиваются; сессионная)
	 * @type String
	 */
	this.visitTempSuffix = '_visittemp';
	/**
	 * Суффикс имени куки дней после визита (устанавливается на это количество дней)
	 * @type String
	 */
	this.dayAfterCloseSuffix = '_dayafterclose';
	/**
	 * Суффикс имени куки, останавливающей подсчет просмотров
	 * @type String
	 */
	this.stopCountViewsSuffix = '_stopcountviews';
	/**
	 * Суффикс имени куки, останавливающей подсчет показов
	 * @type String
	 */
	this.stopCountShowsSuffix = '_stopcountshows';


	// Сохранение состояния
	/**
	 * Индикатор нажал пользователь лайк (true) или нет (false)
	 * @type Boolean
	 */
	this.like = undefined;
	/**
	 * Количество визитов
	 * @type Number
	 */
	this.visitNumber = undefined;
	/**
	 * Количество просомтренных страниц в рамках визита
	 * @type Number
	 */
	this.browsedPageNumber = undefined;
	/**
	 * Количество просмотренных страниц (без учета визитов)
	 * @type Number
	 */
	this.totalBrowsedPageNumber = undefined;
	/**
	 * Номер совпавшего условия
	 * @type Number
	 */
	this.successfulCondition = null;


	// Служебные
	/**
	 * Высота экрана (используется в анимации)
	 * @type Number
	 */
	this.screenHeight = undefined;
}

/**
 * Запуск приложения
 * @param {object} data - объект с данными
 * @param {function} callbackFunction - функция, вызываемая после завершения приложения
 */
Popup.prototype.run = function(data, callbackFunction){
		// получаем объект с данными
	this.getDataObject(data);

		// если подходящий объект с данными не найден, завершаем приложение
	if (this.data == null) return;

		// инициализируем приложение (загружаем свойства из объекта с данными или дефолтные)
	this.init(callbackFunction);

		// проверяем условия для показа
	if (this.checkCondition()) {
		this.show();
	} else {
		this.saveNoShow();
			// если не показали из-за установленного condition.event
		if (this.successfulCondition !== null) {
				// если должно показываться по закрытию
			if (this.conditions[this.successfulCondition].event == 'window.close') this.attachWindowCloseHandler();
				// если event другой, то вешаем ему в обработчик this.show() (в файле настроек)
		}
	}
};

/**
 * Получает объект с данными из data. data может являться непосредственно объектом с данными или содержать несколько объектов и маршруты для их выбора
 * @param {object} data - объект с данными
 * @return {Popup} экземпляр класса
 */
Popup.prototype.getDataObject = function(data) {
	// если есть маршруты
	if ('routs' in data) {
		// перебираем маршруты
		for(var i=0; i<data.routs.length; i++){
			// маршрут совпал
			if(data.routs[i].pattern.test(location)) {
				// имя объекта
				var dataKey = data.routs[i].object;
				// если объект не null
				if (dataKey !== null) this.data = data[dataKey];
				// заканчиваем перебор после первого совпадения
				break;
			}
		}
	}
	// если не маршрутов показываем на все страницах
	else {
		this.data = data;
	}
	return this;
};

/**
 * Инициализация свойств экземпляра (загружаются из объекта с данными или беруться по умолчанию.
 * @param {function} callbackFunction - функция, вызываемая после завершения приложения
 * @return {Popup} экземпляр класса
 */
Popup.prototype.init = function(callbackFunction){
	var data = this.data;
		// id of this popup
	this.id = data.id || 'fbLikePopup';
	this.noFB = data.noFB;
		// text and settings of LikeBox
	this.text = data.text || '';
	this.width = data.width || 500;
	this.height = data.height || 450;
	this.likePage = data.likePage || 'http://www.facebook.com/';
	this.likeWidth = data.likeWidth || 500;
	this.likeHeight = data.likeHeight || 450;
	this.likeShowFace = data.likeShowFace || 'true';
	this.likeStream = data.likeStream || 'false';
	this.likeHeader = data.likeHeader || 'true';
		// statistic counters settings
	this.gaq = data.gaq || {show: null, like: null, close: null};
	this.ym = data.ym || {show: null, like: null, close: null};
	this.gaFunction = data.gaFunction;
	this.ymFunction = data.ymFunction;
		// animation type
	this.anim = data.anim;
		// condition settings
	this.conditions = data.conditions || null;
	this.countViews = (data.countViews !== undefined) ? data.countViews : ((this._checkCookie(this.id+this.stopCountViewsSuffix)) ? false : true);
	this.countShows = (data.countShows !== undefined) ? data.countShows : ((this._checkCookie(this.id+this.stopCountShowsSuffix)) ? false : true);
	this.domain = data.domain || location.hostname ;
		// callback function
	this.callbackFunction = callbackFunction || data.callbackFunction;
	this.beforeShowFunction = data.beforeShowFunction;
	this.afterShowFunction = data.afterShowFunction;
		// like box
	this.likebox = data.likebox || '<div class="fb-like-box" ' +
						'data-href="' + this.likePage +
						'" data-width="' + this.likeWidth +
						'" data-height="' + this.likeHeight +
						'" data-show-faces="' + this.likeShowFace +
						'" data-stream="' + this.likeStream +
						'" data-header="' + this.likeHeader +
					'"></div>';
	return this;
};

/**
 * Проверка условий
 * @return {Boolean} true - показывать попап, false - нет
 */
Popup.prototype.checkCondition = function() {
		// нет условий
	if (this.conditions == null) return true;
		// читаем куку состояния
	this.cookie = this._checkCookie(this.id);
		// если кука состояния установлена в Done больше не показываем
	if (this.cookie == 'Done') return false;
		// читаем куки и пишем переменные состояния
			// показы
	this.showNumber = (this.cookie && this.cookie !== 'Done') ? parseInt(this.cookie) : 0;
			// дней после показа
	this.dayAfterClose = this._checkCookie(this.id + this.dayAfterCloseSuffix);
			// визит
	this.visitNumber = this._checkCookie(this.id + this.visitCookieSuffix) ? parseInt(this._checkCookie(this.id + this.visitCookieSuffix)) : 0;
	if (!this._checkCookie(this.id + this.visitTempSuffix)) this.visitNumber++;
			// страницы в рамках визита
	this.browsedPageNumber = this._checkCookie(this.id + this.pageCookieSuffix) ? parseInt(this._checkCookie(this.id + this.pageCookieSuffix)) + 1 : 1;
			// страницы без учета визитов
	this.totalBrowsedPageNumber = this._checkCookie(this.id + this.totalpageCookieSuffix) ? parseInt(this._checkCookie(this.id + this.totalpageCookieSuffix)) + 1 : 1;

	// перебираем условия
	for (var i=0; i<this.conditions.length; i++){
		var c = this.conditions[i];
			// urls_include
		if (c.urls_include !== undefined && !c.urls_include.test(location)) continue;
			// urls_exclude
		if (c.urls_exclude !== undefined && c.urls_exclude.test(location)) continue;
			// show
		if (c.show !== undefined && c.show !== this.showNumber) continue;
			// after_show
		if (c.after_show !== undefined && c.after_show > this.showNumber) continue;
			// day_after_close
		if (c.day_after_close !== undefined && !this.dayAfterClose && !this.showNumber) continue;
			// visit
		if (c.visit !== undefined && c.visit !== this.visitNumber) continue;
			// after_visit
		if (c.after_visit !== undefined && c.after_visit > this.visitNumber) continue;
			// page_in_visit
		if (c.page_in_visit !== undefined && c.page_in_visit !== this.browsedPageNumber) continue;
			// after_page_in_visit
		if (c.after_page_in_visit !== undefined && c.after_page_in_visit > this.browsedPageNumber) continue;
			// page
		if (c.page !== undefined && c.page !== this.totalBrowsedPageNumber) continue;
			// after_page_in_visit
		if (c.after_page !== undefined && c.after_page > this.totalBrowsedPageNumber) continue;
			// custom condition
		if (c.custom !== undefined && !c.custom) continue;
			// если дошли до сюда - условие выполнено
		this.successfulCondition = i;
			// event (если показывать нужно по событию)
		if (c.event !== undefined) return false;
			// no_show - не показываем
		if (c.no_show !== undefined && c.no_show) return false;
			// показываем
		return true;
	}
	// подходящее условие не найдено
	return false;
};

/**
 * Показ попапа
 * @return {Popup} экземпляр класса
 */
Popup.prototype.show = function(newWindow) {

	if (this.beforeShowFunction != undefined) this.beforeShowFunction(this);
	
	this.popupDiv = document.createElement('div');
	this.popupDiv.id = 'popupDiv_' + this.id;
	this.popupDiv.className = 'FBpopupDiv';

	this.popupDiv.innerHTML = this.text + this.likebox;

	this.closeButton = document.createElement('a');
	this.closeButton.id = 'popupCloseButton';
	this.popupDiv.appendChild(this.closeButton);

	var thiss = this;
	this.closeButton.onclick = function(){thiss.close(false);};

	this.popupDiv.style.width = this.width + 'px';
	this.popupDiv.style.height = this.height + 'px';
	this.popupDiv.style.marginTop = this.height / -2 + 'px';
	this.popupDiv.style.marginLeft = this.width / -2 + 'px';

	var doc = newWindow ? this.newWindow().document : document;

	doc.body.appendChild(this.popupDiv);
	this.popupDiv.style.display = 'none';

	if (!this.noFB) {
		setTimeout(function(){
			FB.XFBML.parse(thiss.popupDiv, function(){});
		}, 500);
	}

	if (typeof FB != 'undefined' || this.noFB) {

		this.popupDiv.style.display = 'block';

		this.popupDiv.style.left = '51%';
		this.popupDiv.style.left = '50%';

		if (this.anim == 'Up') this._animUp();
		else this._animFade();

		this.statistic(this.gaq.show, this.ym.show);

		this.showNumber++;
	}
	else if (this.callbackFunction) this.callbackFunction();

	if (this.afterShowFunction != undefined) this.afterShowFunction(this);
	
	return this;
};

/**
 * Сохранение сотояния без показа
 * @return {Popup} экземпляр класса
 */
Popup.prototype.saveNoShow = function() {
		// выбранное условие (если условие не выбрано - пустой объект, чтоб дальше не вызывало ошибок
	var c = (this.successfulCondition !== null) ? this.conditions[this.successfulCondition] : {};

		// если Done просто выходим
		// если отключен подсчет просмотров ничего считать не надо - просто выходим
		// если есть условие no_count ничего считать не надо - просто выходим
	if (this.cookie == 'Done' || !this.countViews || c.no_count) return this;

		// считаем просомтры
	this._saveViews();

	return this;
};

/**
 * Сохранение состояния после закрытия попапа
 * @return {Popup} экземпляр класса
 */
Popup.prototype.saveClose = function() {
		// выбранное условие (если условие не выбрано - пустой объект, чтоб дальше не вызывало ошибок
	var c = (this.successfulCondition !== null) ? this.conditions[this.successfulCondition] : {};

		// ЕСЛИ ЛАЙКНУЛ ИЛИ В УСЛОВИИ ЕСТЬ ДИРЕКТИВА STOP:
			// пишем куку Done, удаляем остальные куки и выходим
	if (this.like || c.stop) {
		this._setCookie(this.id, 'Done');
		this._deleteCountPageCookie();
		this._deleteCountShowsCookie();
		if (this._checkCookie(this.id + this.stopCountShowsSuffix)) this._deleteCookie(this.id + this.stopCountShowsSuffix);
		if (this._checkCookie(this.id + this.stopCountViewsSuffix)) this._deleteCookie(this.id + this.stopCountViewsSuffix);
		return this;
	}

		// СОХРАНЯЕМ ПРОСОМТРЫ:
			// если есть условие stop_count_views, перестаем считать просмотры -
			// удаляем куки подсчета просмотров и записываем куку, запрещающую считать просомтры
	if (c.stop_count_views) {
		this._setCookie(this.id + this.stopCountViewsSuffix, 'true');
		this._deleteCountPageCookie();
			// если настройки содержут директиву countViews=false (запрет считать просмотры) -
			// ничего не делаем
	} else if (!this.countViews) {
			// если условия stop_count_views нет - сохраняем просмотры
	} else {
		this._saveViews();
	}

		// СОХРАНЯЕМ ПОКАЗЫ ПОПАПА:
			// если есть условие stop_count_shows, перестаем считать показы -
			// удаляем куки подсчета показов и записываем куку, запрещающую считать показы (пишем в основную куку)
	if (c.stop_count_shows) {
		if (this._checkCookie(this.id + this.dayAfterCloseSuffix)) this._deleteCountShowsCookie();
		this._setCookie(this.id + this.stopCountShowsSuffix, 'true');
			// если настройки содержут директиву countShows=false (запрет считать показы) -
			// ничего не делаем
	} else if (!this.countShows) {
			// если условия stop_count_shows нет - сохраняем показы
	} else {
		var showNumber = this.cookie ? parseInt(this.cookie) + 1 : 1;
		this._setCookie(this.id, showNumber);
		this._setCookie(this.id + this.dayAfterCloseSuffix, 'true', new Date( new Date().getTime()+ 1000*60*60*24*c.day_after_show).toGMTString());
	}

	return this;
};

/**
 * Удаление кук подсчета просмотров страниц, визитов
 * @return {Popup} экземпляр класса
 */
Popup.prototype._deleteCountPageCookie = function() {
	if (this._checkCookie(this.id + this.visitCookieSuffix)) this._deleteCookie(this.id + this.visitCookieSuffix);
	if (this._checkCookie(this.id + this.pageCookieSuffix)) this._deleteCookie(this.id + this.pageCookieSuffix);
	if (this._checkCookie(this.id + this.totalpageCookieSuffix)) this._deleteCookie(this.id + this.totalpageCookieSuffix);
	if (this._checkCookie(this.id + this.visitTempSuffix)) this._deleteCookie(this.id + this.visitTempSuffix);

	return this;
};

/**
 * Удаление кук подсчета показов попапа
 * @return {Popup} экземпляр класса
 */
Popup.prototype._deleteCountShowsCookie = function () {
	if (this._checkCookie(this.id + this.dayAfterCloseSuffix)) this._deleteCookie(this.id + this.dayAfterCloseSuffix);
 	return this;
};

/**
 * Сохранение визитов
 * @return {Popup} экземпляр класса
 */
Popup.prototype._saveViews = function() {

		// СОХРАНЯЕМ ВИЗИТЫ
		// Если не установлена кука visitTemp, значит это новый визит.
		// Ставим visitTemp (сессионная), чтоб не увеличивались визиты при просмотре др. страниц.
		// Перезаписываем куку с новым чилом визитов.
	if (!this._checkCookie(this.id + this.visitTempSuffix)) {
		this._setCookie(this.id + this.visitTempSuffix, 'true', 'temp');
		this._setCookie(this.id + this.visitCookieSuffix, this.visitNumber);
	}

		// СОХРАНЯЕМ СТРАНИЦЫ В РАМКАХ ВИЗИТА
		// Кука сессионная, чтоб удалилась после завершения визита.
	this._setCookie(this.id + this.pageCookieSuffix, this.browsedPageNumber, 'temp');

		// СОХРАНЯЕМ СТРАНИЦЫ
	this._setCookie(this.id + this.totalpageCookieSuffix, this.totalBrowsedPageNumber);

	return this;
};

/**
 * Закрытие попапа
 * @param {Boolean} like - если закрывается через like - true, в противном случае false
 * @return {Popup} экземпляр класса
 */
Popup.prototype.close = function(like){
	this.like = like;

	this.saveClose();

	if (this.like) this.statistic(this.gaq.like, this.ym.like);
	else this.statistic(this.gaq.close, this.ym.close);

	document.body.removeChild(this.popupDiv);
	if (this.callbackFunction) this.callbackFunction();

	return this;
};

/**
 * Удаление куки
 * @param {string} cookie - имя куки
 * @return {Popup} экземпляр класса
 */
Popup.prototype._deleteCookie = function(cookie){
	var expires = new Date( new Date().getTime() - 1000*60*60*24).toGMTString();
	this._setCookie(cookie, '', expires);
	return this;
};

/**
 * Установка куки
 * @param {string} cookie - имя куки
 * @param {string} value - значение куки
 * @param {Date|String} expires - время жизни куки: объект Date или строка 'temp' для установки сессионной куки (если не передать - по умолчанию 1 год)
 * @return {Popup} экземпляр класса
 */
Popup.prototype._setCookie = function(cookie, value, expires) {
	var path = ';path=/';
	var domain = ';domain=' + this.domain;
	expires = expires || new Date( new Date().getTime()+ 1000*60*60*24*365).toGMTString();
	expires = (expires == 'temp') ? '' : (';expires=' + expires);

	document.cookie = cookie + '=' + value + expires + path + domain;

	return this;
};

/**
 * Проверка куки
 * @param {string} name - имя куки
 * @return {Ambiguous: Boolean|String} если кука не найдена - false, если найдена - ее значение
 */
Popup.prototype._checkCookie = function(name){
	var isCookie = document.cookie.indexOf(name + '=');
	if (isCookie == -1) return false;
	var valueStart = isCookie + name.length + 1;
	var cookieStart = document.cookie.substring(valueStart);
	var valueEnd = (cookieStart.indexOf(';') == -1) ? cookieStart.length : cookieStart.indexOf(';');
	var cookieValue = cookieStart.substring(0, valueEnd);
	return cookieValue;
};

/**
 * Анимация проявления
 * @return {Popup} экземпляр класса
 */
Popup.prototype._animFade = function(){
	this.popupDiv.style.opacity = 0;
	this.popupDiv.style.filter = 'alpha(opacity=0)';

	var start = new Date().getTime();
	var popupDiv = this.popupDiv; // for FF
		setTimeout(function() {
			var now = (new Date().getTime()) - start;
			var progress = now / 500;
			if (progress < 1) {
				popupDiv.style.opacity = (1 - 0) * delta(progress) + 0;
				popupDiv.style.filter = 'alpha(opacity=' + Math.round((100 - 0) * delta(progress) + 0) + ')';
				setTimeout(arguments.callee, 10);
			}else{
				popupDiv.style.opacity = 1;
				popupDiv.style.filter = 'none';
			}
		}, 10);

	var delta = function(progress) {
		return progress;
	};
	return this;
};

/**
 * Анимация появления снизу
 * @return {Popup} экземпляр класса
 */
Popup.prototype._animUp = function (){
	this.screenHeight = window.innerHeight || (document.documentElement.clientHeight || document.body.clientHeight);
	this.popupDiv.style.top = this.screenHeight + this.height / 2 + 'px';
	var startValue = this.screenHeight + this.height / 2;
	var finalValue = this.screenHeight / 2;
	var start = new Date().getTime();
	var popupDiv = this.popupDiv; // for FF
		setTimeout(function() {
			var now = (new Date().getTime()) - start;
			var progress = now / 1000;
			if (progress < 1) {
				popupDiv.style.top = Math.round((finalValue - startValue) * delta(progress) + startValue) + 'px';
				setTimeout(arguments.callee, 10);
			}else{
				popupDiv.style.top = finalValue + 'px';
			}
		}, 10);

	var delta = function(progress) {
		function d(progress) {
			for (var a = 0, b = 1; 1; a += b, b /= 2) {
				if (progress >= (7 - 4 * a) / 11)
					return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2)
							+ Math.pow(b, 2);
			}
		}
		return 1 - d(1 - progress);
	};
	return this;
};

/**
 * Подсчет статистики
 * @param {string} ga
 * @param {string} ym
 * @return {Popup} экземпляр класса
 */
Popup.prototype.statistic = function(ga, ym) {
	if (ga) this.gaFunction(ga);
	if (ym) this.ymFunction(ym);
	return this;
};

/**
 * Появление попапа при закрытии окна (пользователь повел курсор вверх)
 * @return {Popup} экземпляр класса
 */
Popup.prototype.attachWindowCloseHandler = function() {

		 // Создаем элемент в верху окна, при наведении на который будет показываться попап.
		 // Стили задаются в css файле.
	this.windowCloseElement = document.createElement('div');
	this.windowCloseElement.id = 'windowCloseElement';
	this.windowCloseElement.className = 'windowCloseElement';

		// вешаем на него событие onmouseover, по которому будет показан попап
	var thiss = this;
	this.windowCloseElement.onmouseover = function(){
		thiss.show();
			// после показа попапа удаляем элемент-тригер, чтоб больше не показывался попап
		document.body.removeChild(this);
	};

	document.body.appendChild(this.windowCloseElement);

	return this;
};



/*============================ В РАЗРАБОТКЕ ============================*/

/**
 * в разработке
 * @return {}
 */
Popup.prototype.newWindow = function() {

	var newWindow = window.open('','newWindow', 'width=500,height=500');
	var d = newWindow.document;
	var head  = d.getElementsByTagName('head')[0];
	var link  = d.createElement('link');
	link.rel  = 'stylesheet';
	link.type = 'text/css';
	link.href = 'http://abbyy.ru/css/fbLikePopup.css';
	head.appendChild(link);

	return newWindow;
};