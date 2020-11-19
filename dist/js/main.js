window.onload = function () {
	var mob_to_open = document.querySelector('#mobile_menu_open');
	var mob_to_close = document.querySelector('#mobile_menu_close');

	mob_to_open.addEventListener('click', function(e){
		e.preventDefault();
		alert('open');
	});

	mob_to_close.addEventListener('click', function(e){
		e.preventDefault();
		alert('close');
	});






}