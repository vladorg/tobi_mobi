window.onload = function () {
	var mob_to_open = document.querySelector('#mobile_menu_open');
	var mob_to_close = document.querySelector('#mobile_menu_close');
	var mob_menu = document.querySelector('.mobMenu');
	var top_menu_items = document.querySelectorAll('.topCatalogMenu__hasChild');
	var top_menu_list = document.querySelector('.topCatalogMenu ul');


	mob_to_open.addEventListener('click', function(e){
		e.preventDefault();
		mob_menu.classList.toggle('mobMenu--open');
	});

	mob_to_close.addEventListener('click', function(e){
		e.preventDefault();
		mob_menu.classList.remove('mobMenu--open');
	});

	for(let i=0;i<top_menu_items.length;i++) {
		top_menu_items[i].addEventListener('mouseenter', function(){
			top_menu_list.classList.add('hovered');
		});
		top_menu_items[i].addEventListener('mouseleave', function(){
			top_menu_list.classList.remove('hovered');
		});
	}






}