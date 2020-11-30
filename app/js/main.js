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

	
	

	$('.related__prods').slick({
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



	// range

	$(function () {
		var min_val = $("input#priceMin").data('min');
		var max_val = $("input#priceMax").data('max');
		console.log(min_val);
		console.log(max_val);
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










}