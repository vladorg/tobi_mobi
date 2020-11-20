window.onload = function () {
	var header_area = document.querySelector('.header');
	var mob_to_open = document.querySelector('#mobile_menu_open');
	var mob_to_close = document.querySelector('#mobile_menu_close');
	var mob_menu = document.querySelector('.mobMenu');
	var top_menu_btn = document.querySelector('.topCatalog__btn');
	var top_menu_items = document.querySelectorAll('.topCatalogMenu__hasChild');
	var top_menu_list = document.querySelector('.topCatalogMenu ul');
	var cart_link = document.querySelector('.headerCart__link');
	var cart_items = document.querySelector('.headerCart__itemsWrap--cart');
	var wish_link = document.querySelector('.headerWish__link');
	var wish_items = document.querySelector('.headerCart__itemsWrap--wish');
	var comp_link = document.querySelector('.headerComp__link');
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

	for(let i=0;i<top_menu_items.length;i++) { // смена визуала рамки меню первого уровня по наведеню на подпункты
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
		modal_cart.classList.add('modalCart--open')
		header_area.classList.add('header--active');
	});

	wish_link.addEventListener('click', function(e){ // отрыть дропдаун избранного
		e.preventDefault();
		cart_items.classList.remove('headerCart__itemsWrap--open');
		wish_items.classList.toggle('headerCart__itemsWrap--open');
		comp_items.classList.remove('headerCart__itemsWrap--open');
		if (header_area.classList != 'header--active') {
			header_area.classList.add('header--active');
		}
	});

	comp_link.addEventListener('click', function(e){ // отрыть дропдаун сравнения
		e.preventDefault();
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
		if ( !modal_cart.querySelector('.modal__win').contains(e.target) && !cart_items.contains(e.target) ) { // закрытие popupа корзины
			modal_cart.classList.remove('modal--open');
		};
		if ( !modal_login.querySelector('.modal__win').contains(e.target) && !header_area.contains(e.target) ) { // закрытие popupа авторизации
			modal_login.classList.remove('modal--open');
		};
	};

	for(let i=0;i<open_modal_cart.length;i++) {
		open_modal_cart[i].addEventListener('click', function(e){ // отрыть pop up корзины
			e.preventDefault();
			cart_items.classList.remove('headerCart__itemsWrap--open');
			modal_cart.classList.add('modal--open')
		});
	}

	for(let i=0;i<close_modal_cart.length;i++) {
		close_modal_cart[i].addEventListener('click', function(e){ // закрыть pop up корзины
			e.preventDefault();
			modal_cart.classList.remove('modal--open', 'modalCart--open')
		});
	}




	// добавление кол-ва товара
	var minus = document.querySelectorAll('.minus');
	var plus = document.querySelectorAll('.plus');
	var quantly_in = document.querySelectorAll('.quantly input[name=quantly]');
	var quantly; // тут будет количество
	var quantly_step; // тут будет шаг

	for(let i=0;i<minus.length;i++) {
		minus[i].addEventListener('click', function(e){
			quantly = parseFloat(this.parentNode.querySelector('input').value);
			quantly_step = parseFloat(this.parentNode.querySelector('input').getAttribute('data-step'));
			if (quantly > quantly_step) {
				this.parentNode.querySelector('input').value = quantly - quantly_step;
			}
		});
	}

	for(let i=0;i<plus.length;i++) {
		plus[i].addEventListener('click', function(e){
			quantly = parseFloat(this.parentNode.querySelector('input').value);
			quantly_step = parseFloat(this.parentNode.querySelector('input').getAttribute('data-step'));
			this.parentNode.querySelector('input').value = quantly + quantly_step;		
		});
	}




	var open_modal_login = document.querySelectorAll('.open_modal_login');
	var close_modal_login = document.querySelectorAll('.close_modal_login');
	var modal_login = document.querySelector('#modal_login');


	for(let i=0;i<open_modal_login.length;i++) {
		open_modal_login[i].addEventListener('click', function(e){ // отрыть pop up корзины
			e.preventDefault();
			cart_items.classList.remove('headerCart__itemsWrap--open');
			modal_login.classList.add('modal--open')
		});
	}

	for(let i=0;i<close_modal_login.length;i++) {
		close_modal_login[i].addEventListener('click', function(e){ // закрыть pop up корзины
			e.preventDefault();
			modal_login.classList.remove('modal--open')
		});
	}






}