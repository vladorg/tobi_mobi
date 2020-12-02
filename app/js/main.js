window.onload = function () {
	var header_area = document.querySelector('.header');
	var mob_to_open = document.querySelector('#mobile_menu_open');
	var mob_to_close = document.querySelector('#mobile_menu_close');
	var mob_menu = document.querySelector('.mobMenu');
	var top_menu_btn = document.querySelector('.topCatalog__btn');
	var top_menu_items = document.querySelectorAll('.topCatalogMenu__hasChild');
	var top_menu_list = document.querySelector('.topCatalogMenu ul');
	var cart_link = document.querySelector('.headerCart__link');
	var cart_link_mobile = document.querySelector('.headerCart__linkMobile');
	var cart_items = document.querySelector('.headerCart__itemsWrap--cart');
	var wish_link = document.querySelector('.headerWish__link');
	var wish_linkMobile = document.querySelector('.headerWish__linkMobile');
	var wish_items = document.querySelector('.headerCart__itemsWrap--wish');
	var comp_link = document.querySelector('.headerComp__link');
	var comp_link_mobile = document.querySelector('.headerComp__linkMobile');
	var comp_items = document.querySelector('.headerCart__itemsWrap--comp');
	var modal_cart = document.querySelector('#modal_cart');
	var open_modal_cart = document.querySelectorAll('.open_modal_cart');
	var close_modal_cart = document.querySelectorAll('.close_modal_cart');


	mob_to_open.addEventListener('click', function(e){ // открытие мобильного меню
		e.preventDefault();
		mob_menu.classList.toggle('mobMenu--open');
	});

	mob_to_close.addEventListener('click', function(e){ // закрытие мобильного меню
		e.preventDefault();
		mob_menu.classList.remove('mobMenu--open');
	});

	for(var i=0;i<top_menu_items.length;i++) { // смена визуала рамки меню первого уровня по наведеню на подпункты
		top_menu_items[i].addEventListener('mouseenter', function(){
			top_menu_list.classList.add('hovered');
		});
		top_menu_items[i].addEventListener('mouseleave', function(){
			top_menu_list.classList.remove('hovered');
		});
	}

	cart_link.addEventListener('click', function(e){ // отрыть дропдаун корзины
		e.preventDefault();
		wish_items.classList.remove('headerCart__itemsWrap--open');
		cart_items.classList.toggle('headerCart__itemsWrap--open');
		comp_items.classList.remove('headerCart__itemsWrap--open');
		//modal_cart.classList.add('modalCart--open')
		header_area.classList.add('header--active');
	});

	wish_link.addEventListener('click', function(e){ // отрыть дропдаун избранного

		if (!wish_linkMobile.contains(e.target)) { 
		// если мобильная версия то отменяем запрет на переход по ссылке и отправляем пользователя на страницу избранного
		e.preventDefault();
	}
	cart_items.classList.remove('headerCart__itemsWrap--open');
	wish_items.classList.toggle('headerCart__itemsWrap--open');
	comp_items.classList.remove('headerCart__itemsWrap--open');
	if (header_area.classList != 'header--active') {
		header_area.classList.add('header--active');
	}		
});

	comp_link.addEventListener('click', function(e){ // отрыть дропдаун сравнения	

		if (!comp_link_mobile.contains(e.target)) { 
		// если мобильная версия то отменяем запрет на переход по ссылке и отправляем пользователя на страницу сравнения
		e.preventDefault();
	}
	cart_items.classList.remove('headerCart__itemsWrap--open');
	wish_items.classList.remove('headerCart__itemsWrap--open');
	comp_items.classList.toggle('headerCart__itemsWrap--open');
	if (header_area.classList != 'header--active') {
		header_area.classList.add('header--active');
	}
});

	top_menu_btn.addEventListener('mouseenter', function(){ // по наведению на кнопку каталога - скрыть дропдауны корзины, избранного, сравнения
		cart_items.classList.remove('headerCart__itemsWrap--open');
		wish_items.classList.remove('headerCart__itemsWrap--open');
		comp_items.classList.remove('headerCart__itemsWrap--open');
		header_area.classList.remove('header--active');
	});

	document.onclick = function(e){ // закрытие блоков по клику вне них
		if ( !cart_link.contains(e.target) && !cart_items.contains(e.target) ) { // закрытие дропдауна корзины
			cart_items.classList.remove('headerCart__itemsWrap--open');
		};
		if ( !wish_link.contains(e.target) && !wish_items.contains(e.target) ) { // закрытие дропдауна избранного
			wish_items.classList.remove('headerCart__itemsWrap--open');
		};
		if ( !comp_link.contains(e.target) && !comp_items.contains(e.target) ) { // закрытие дропдауна сравнения
			comp_items.classList.remove('headerCart__itemsWrap--open');
		};
		if ( !modal_cart.querySelector('.modal__win').contains(e.target) && !cart_items.contains(e.target) && !cart_link_mobile.contains(e.target) ) { // закрытие popupа корзины
			modal_cart.classList.remove('modal--open', 'modalCart--open');
		};
		if ( !modal_login.querySelector('.modal__win').contains(e.target) && !header_area.contains(e.target) ) { // закрытие popupа авторизации
			modal_login.classList.remove('modal--open');
		};
	};

	for(var i=0;i<open_modal_cart.length;i++) {
		open_modal_cart[i].addEventListener('click', function(e){ // отрыть pop up корзины
			e.preventDefault();
			cart_items.classList.remove('headerCart__itemsWrap--open');
			modal_cart.classList.add('modal--open', 'modalCart--open');
		});
	}

	for(var i=0;i<close_modal_cart.length;i++) {
		close_modal_cart[i].addEventListener('click', function(e){ // закрыть pop up корзины
			e.preventDefault();
			modal_cart.classList.remove('modal--open', 'modalCart--open')
		});
	}

	cart_link_mobile.addEventListener('click', function(e){ // отрыть дропдаун сравнения
		e.preventDefault();
		modal_cart.classList.add('modalCart--open')
	});

	// добавление кол-ва товара
	var minus = document.querySelectorAll('.minus');
	var plus = document.querySelectorAll('.plus');
	var quantly_in = document.querySelectorAll('.quantly input[name=quantly]');
	var quantly; // тут будет количество
	var quantly_step; // тут будет шаг

	for(var i=0;i<minus.length;i++) {
		minus[i].addEventListener('click', function(e){
			quantly = parseFloat(this.parentNode.querySelector('input').value);
			quantly_step = parseFloat(this.parentNode.querySelector('input').getAttribute('data-step'));
			if (quantly > quantly_step) {
				this.parentNode.querySelector('input').value = quantly - quantly_step;
			}
		});
	}

	for(var i=0;i<plus.length;i++) {
		plus[i].addEventListener('click', function(e){
			quantly = parseFloat(this.parentNode.querySelector('input').value);
			quantly_step = parseFloat(this.parentNode.querySelector('input').getAttribute('data-step'));
			this.parentNode.querySelector('input').value = quantly + quantly_step;		
		});
	}






	// ************************************************************ //




	var open_modal_login = document.querySelectorAll('.open_modal_login');
	var close_modal_login = document.querySelectorAll('.close_modal_login');
	var modal_login = document.querySelector('#modal_login');
	var open_cat = document.querySelectorAll('.open_catalog');
	var close_cat = document.querySelectorAll('.close_catalog');
	var catalog = document.querySelector('.topCatalog');
	var open_cat_child = document.querySelectorAll('.open_catalog_child');
	var open_child_child = document.querySelectorAll('.open_child_child');


	for(var i=0;i<open_modal_login.length;i++) {
		open_modal_login[i].addEventListener('click', function(e){ // отрыть pop up корзины
			e.preventDefault();
			cart_items.classList.remove('headerCart__itemsWrap--open');
			modal_login.classList.add('modal--open')
		});
	}

	for(var i=0;i<close_modal_login.length;i++) {
		close_modal_login[i].addEventListener('click', function(e){ // закрыть pop up корзины
			e.preventDefault();
			modal_login.classList.remove('modal--open')
		});
	}

	for(var i=0;i<open_cat.length;i++) {
		open_cat[i].addEventListener('click', function(e){ // открыть каталог
			e.preventDefault();
			header_area.classList.remove('header--active');
			mob_menu.classList.remove('mobMenu--open');
			catalog.classList.add('topCatalog--open')
		});
	}

	for(var i=0;i<close_cat.length;i++) {
		close_cat[i].addEventListener('click', function(e){ // закрыть каталог
			e.preventDefault();
			catalog.classList.remove('topCatalog--open')
		});
	}

	for(var i=0;i<open_cat_child.length;i++) {
		open_cat_child[i].addEventListener('click', function(e){ // открыть меню 2 уровня
			e.preventDefault();
			var parent = this.parentNode.parentNode;
			this.classList.toggle('topCatalogMenu__arr--open');
			parent.querySelector('.topCatalogChild').classList.toggle('topCatalogChild--open');
		});
	}

	for(var i=0;i<open_child_child.length;i++) {
		open_child_child[i].addEventListener('click', function(e){ // открыть меню 3 уровня
			e.preventDefault();
			var parent = this.parentNode;
			this.classList.toggle('topCatalogMenu__arr--open');
			parent.querySelector('.topCatalogChild__list').classList.toggle('topCatalogChild__list--open');
		});
	}








	$('.mainSlider__inner').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 4000,
		speed: 700,
		dots: true,
		responsive: [
		{
			breakpoint: 768,
			settings: {
				dots: false,
			}
		}
		]
	});

	$('.mainSlider .slick-dots li button').html( $('.progressCircle').clone() );

	
	

	$('.related .related__prods').slick({
		infinite: false,
		slidesToShow: 6,
		slidesToScroll: 1,
		variableWidth: true,
		autoplay: true,
		prevArrow: $('.related__left'),
		nextArrow: $('.related__right'),
		responsive: [
		{
			breakpoint: 1750,
			settings: {
				slidesToShow: 6,
				variableWidth: false,
			}
		},
		{
			breakpoint: 1460,
			settings: {
				slidesToShow: 5,
				variableWidth: false,
			}
		},
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 4,
				variableWidth: false,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 3,
				variableWidth: false,
			}
		},
		{
			breakpoint: 550,
			settings: {
				slidesToShow: 2,
				variableWidth: false,
			}
		}
		]
	});

	$('.brands__items').slick({
		infinite: true,
		slidesToShow: 6,
		slidesToScroll: 1,
		autoplay: true,
		responsive: [
		{
			breakpoint: 1750,
			settings: {
				slidesToShow: 5,
				variableWidth: false,
			}
		},
		{
			breakpoint: 1400,
			settings: {
				slidesToShow: 4,
				variableWidth: false,
			}
		},
		{
			breakpoint: 1100,
			settings: {
				slidesToShow: 3,
				variableWidth: false,
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 2,
				variableWidth: false,
			}
		}
		]
	});




	var open_seo = document.querySelectorAll('.seo__readAll');
	var open_dropdown = document.querySelectorAll('.dropdown__title');
	var get_grid = document.querySelectorAll('.en_grid');
	var get_list = document.querySelectorAll('.en_list');
	var get_products = document.querySelector('.products');
	var filter_btn = document.querySelectorAll('.filter__title');
	var filter_btn_showAll = document.querySelectorAll('.filter__all');

	var filter_open = document.querySelectorAll('.category__filterOpen');
	var filter_close = document.querySelectorAll('.category__filterClose');
	var filter = document.querySelector('.filter');


	for(var i=0;i<open_seo.length;i++) {
		open_seo[i].addEventListener('click', function(e){ // развернуть блок сео текста
			e.preventDefault();
			var seo = this.parentNode.querySelector('.seo__inner');
			seo.classList.toggle('seo__inner--closed');
			seo.classList.toggle('seo__inner--opened');
		});
	}

	for(var i=0;i<open_dropdown.length;i++) {
		open_dropdown[i].addEventListener('click', function(e){ // развернуть дропдаун
			e.preventDefault();
			var list = this.parentNode;
			list.classList.toggle('dropdown--open');
		});
	}

	for(var i=0;i<get_grid.length;i++) {
		get_grid[i].addEventListener('click', function(e){ // вид превью товара - сетка
			get_products.classList.remove('products--list');
			if (get_products.classList != 'products--grid') {
				get_products.classList.add('products--grid');
			}
		});
	}

	for(var i=0;i<get_list.length;i++) {
		get_list[i].addEventListener('click', function(e){ // вид превью товара - список
			get_products.classList.remove('products--grid');
			if (get_products.classList != 'products--list') {
				get_products.classList.add('products--list');
			}
		});
	}

	for(var i=0;i<filter_btn.length;i++) {
		filter_btn[i].addEventListener('click', function(e){ // открыть пункт фильтра
			this.parentNode.querySelector('.filter__list').classList.toggle('filter__list--open');
			this.classList.toggle('filter__title--open');
		});
	}

	for(var i=0;i<filter_btn_showAll.length;i++) {
		filter_btn_showAll[i].addEventListener('click', function(e){ // открыть остальные пункты
			var others = this.parentNode.querySelectorAll('.filter__row--more')
			for(var i=0;i<others.length;i++) {
				others[i].classList.toggle('filter__row--open');
			}
		});
	}



	// range фильтр на странице категории

	$(function () { 
		var min_val = $("input#priceMin").data('min');
		var max_val = $("input#priceMax").data('max');
		$("#filter__range").slider({
			min: min_val,
			max: max_val,
			values: [min_val,max_val],
			range: true,
			stop: function(event, ui) {
				$("input#priceMin").val($("#filter__range").slider("values",0));
				$("input#priceMax").val($("#filter__range").slider("values",1));

				$('.price-range-min.value').html($("#filter__range").slider("values",0));
				$('.price-range-max.value').html($("#filter__range").slider("values",1));
			},
			slide: function(event, ui){
				$("input#priceMin").val($("#filter__range").slider("values",0));
				$("input#priceMax").val($("#filter__range").slider("values",1));

				$('.price-range-min.value').html($("#filter__range").slider("values",0));
				$('.price-range-max.value').html($("#filter__range").slider("values",1));
			}
		});

		$("input#priceMin").on('change', function(){
			var value1=$("input#priceMin").val();
			var value2=$("input#priceMax").val();
			if(parseInt(value1) > parseInt(value2)){
				value1 = value2;
				$("input#priceMin").val(value1);
				$('.price-range-min.value').html(value1);
			}
			$("#filter__range").slider("values", 0, value1);
			$('.price-range-min.value').html(value1);
		});

		$("input#priceMax").on('change', function(){
			var value1=$("input#priceMin").val();
			var value2=$("input#priceMax").val();
			if (value2 > max_val) { 
				value2 = max_val; 
				$("input#priceMax").val(max_val)
			}
			if(parseInt(value1) > parseInt(value2)){
				value2 = value1;
				$("input#priceMax").val(value2);
				$('.price-range-max.value').html(value2);
			}
			$("#filter__range").slider("values",1,value2);
			$('.price-range-max.value').html(value2);
		});

		$('.ui-slider-handle:eq(0)').append('<span class="price-range-min value">' + $('#filter__range').slider('values', 0 ) + '</span>');
		$('.ui-slider-handle:eq(1)').append('<span class="price-range-max value">' + $('#filter__range').slider('values', 1 ) + '</span>');
	});



	for(var i=0;i<filter_open.length;i++) {
		filter_open[i].addEventListener('click', function(e){ // развернуть фильтр
			filter.classList.toggle('filter--open');
		});
	}

	for(var i=0;i<filter_close.length;i++) {
		filter_close[i].addEventListener('click', function(e){ // закрыть фильтр
			filter.classList.remove('filter--open');
		});
	}





	// ================================== //
	// карточка товара



	var product_btn_all = document.querySelector('.product__btn--all');
	var product_btn_chars = document.querySelector('.product__btn--chars');
	var product_btn_test = document.querySelector('.product__btn--test');
	var product_btn_quest = document.querySelector('.product__btn--quest');
	var product_btn_related = document.querySelector('.product__btn--related');

	var tab_all = document.querySelector('.product__tab--all');
	var tab_chars = document.querySelector('.product__tab--chars');
	var tab_test = document.querySelector('.product__tab--test');
	var tab_quest = document.querySelector('.product__tab--quest');
	var tab_related = document.querySelector('.product__tab--related');

	var product_desc_btn = document.querySelector('.productDescription__btn');
	var product_desc_cont = document.querySelector('.productDescription__content');

	var product_chars_btn = document.querySelectorAll('.productChars__title');
	var product_related_btn = document.querySelectorAll('.productRelated__title');

	var product_test_rate = document.querySelectorAll('.productTest__rateItem');

	var product_test_add = document.querySelector('.productTest__anc');
	var product_test_area = document.querySelector('#testimonial_add');
	var product_quest_add = document.querySelector('.productQuest__anc');
	var product_quest_area = document.querySelector('#question_add');



	function productTabs(elem, tab) { // переключатель табов
		elem.addEventListener('click', function(e){
			var btn_sibl = this.parentNode.querySelectorAll('.product__btn');
			var btn_cls = this.classList;
			var tab_sibl = tab.parentNode.querySelectorAll('.product__tab');
			var tab_cls = tab.classList;


			for(var i=0;i<btn_sibl.length;i++) {
				if (btn_sibl[i].classList != btn_cls) {
					btn_sibl[i].classList.remove('product__btn--active');
				} else {
					btn_sibl[i].classList.add('product__btn--active');
				}
			}
			for(var i=0;i<tab_sibl.length;i++) {
				if (tab_sibl[i].classList != tab_cls) {
					tab_sibl[i].classList.remove('product__tab--active');
				} else {
					tab_sibl[i].classList.add('product__tab--active');
				}
				if (elem != product_btn_all) {
					tab_sibl[i].classList.add('product__tab--abs');
					document.querySelector('.product .product__info').classList.add('product__tab--abs');
					document.querySelector('.productWidget').classList.add('product__tab--abs');
				} else {
					tab_sibl[i].classList.remove('product__tab--abs');
					document.querySelector('.product .product__info').classList.remove('product__tab--abs');
					document.querySelector('.productWidget').classList.remove('product__tab--abs');
				}
			}

			
		});
	}

	productTabs(product_btn_all, tab_all);
	productTabs(product_btn_chars, tab_chars);
	productTabs(product_btn_test, tab_test);
	productTabs(product_btn_quest, tab_quest);
	productTabs(product_btn_related, tab_related);

	$('.product__thumb').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.product__thumbNav',
		//infinite: true,
		//variableWidth: true

	});
	$('.product__thumbNav').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		vertical: true,
		verticalSwiping: true,
		asNavFor: '.product__thumb',
		dots: false,
		focusOnSelect: true,
		infinite: true,
		responsive: [
		{
			breakpoint: 500,
			settings: {
				slidesToShow: 3,
			}
		}
		]
	});

	$('.product__nav').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		variableWidth: true,
		arrows: false,
		infinite: false,
		responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 4,
				variableWidth: true,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 5,
				variableWidth: true,
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 5,
				variableWidth: true,
			}
		},
		{
			breakpoint: 550,
			settings: {
				slidesToShow: 3,
				variableWidth: true,
			}
		}
		]
	});


	product_desc_btn.addEventListener('click', function(e){  // развернуть описание в карточке товара
		product_desc_cont.classList.toggle('productDescription__content--open');
	});

	for(var i=0;i<product_chars_btn.length;i++) { // развернуть список характеристик в карточке товара
		product_chars_btn[i].addEventListener('click', function(e){
			var others = this.parentNode.querySelector('.productChars__list');
			this.classList.toggle('productChars__title--open');
			others.classList.toggle('productChars__list--open');
			
		});
	}


	for(var i=0;i<product_test_rate.length;i++) {  // рейтинг в карточке товара
		product_test_rate[i].addEventListener('click', function(e){
			var others = this.parentNode.querySelectorAll('.productTest__rateItem')
			var rate = this.querySelector('input').value;
			document.querySelector('.productTest__rateComment span').innerHTML = rate;
			
			for(var i=0;i<others.length;i++) {
				others[i].classList.remove('productTest__rateItem--active');
			}

			this.classList.add('productTest__rateItem--active');
		});
	}


	product_test_add.addEventListener('click', function(e) { // якорь к форме отзыва в карточке товара
		product_test_area.scrollIntoView({
			behavior: 'smooth',
			block: 'center'
		});
	});

	product_quest_add.addEventListener('click', function(e) { // якорь к форме вопроса в карточке товара
		product_quest_area.scrollIntoView({
			behavior: 'smooth',
			block: 'center'
		});
	});

	$('.productRelated__products').each(function(){
		var $this = $(this);
		var left = $this.prev().find('.related__left');
		var right = $this.prev().find('.related__right');

		$this.slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			//variableWidth: false,
			prevArrow: left,
			nextArrow: right,
			infinite: false,
			responsive: [
			{
				breakpoint: 1600,
				settings: {
					slidesToShow: 3,
					//variableWidth: false,
				}
			}
			]
		});
	});



	$('.productRelated__title').on('click', function(){ // развернуть блок похожих товаров в карточке товара
		$(this).toggleClass('productRelated__title--open');
		$(this).parent().find('.productRelated__products').slideToggle(300);
		$(this).parent().find('.title__arrows').toggleClass('title__arrows--open');
	});
	











}