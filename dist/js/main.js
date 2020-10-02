$(document).ready(function(){



	$('#burger').on('click', function(){
		$('.headerNav').toggleClass('headerNav--open');
		$('body').toggleClass('overlay');
		setTimeout(function(){
			$('#burger').toggleClass('mobMenuBtn--open');
		}, 200);
	});

	$('#topFormBtn').on('click', function(e){
		var name = $('.mainSliderForm__name').val();
		var phone = $('.mainSliderForm__phone').val();
		var select = $('.mainSliderForm__select').val();
		var name_count = $('.mainSliderForm__name').val().length;
		var phone_count = $('.mainSliderForm__phone').val().length;
		if (name !== "") {			
			if (name_count >= 2) {
				$('.mainSliderForm__name').removeClass('mainSliderForm--err');
				if (phone !== "") {
					if (phone_count >= 10) {
						$('.mainSliderForm__phone').removeClass('mainSliderForm--err');
						if (select !== "chose_nothing") {
							alert("Форма успешно отправлена!");
						} else {
							event.preventDefault();
							$('.mainSliderForm__select').addClass('mainSliderForm--err');
							setTimeout(function(){
								alert("Выберите опцию!");
							}, 100);
						}
					} else {
						event.preventDefault();
						$('.mainSliderForm__phone').addClass('mainSliderForm--err');
						setTimeout(function(){
							alert("Номер телефона не должен быть короче 10 символов!");
						}, 100);
					}
				} else {
					event.preventDefault();
					$('.mainSliderForm__phone').addClass('mainSliderForm--err');
					setTimeout(function(){
						alert("Номер телефона не должен быть пустым!");
					}, 100);
				}
			} else {
				event.preventDefault();
				$('.mainSliderForm__name').addClass('mainSliderForm--err');				
				setTimeout(function(){
					alert("Имя не должно быть короче 2-х символов!");
				}, 100);
			}
		} else {
			event.preventDefault();
			$('.mainSliderForm__name').addClass('mainSliderForm--err');
			setTimeout(function(){
				alert("Имя не должно быть пустым!");
			}, 100);
		}
	});
	$('.aboutSlider').slick({
		dots: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true
	});
	$('.testimonialsSlider').slick({
		dots: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true
	});

	$(".headerNav a").on("click", function (e) {
		if ($(this).attr("href") !== "/yoga/") {
			e.preventDefault();
		}      
		var id  = $(this).attr('href'),
		top = $(id).offset().top;
		$('body,html').animate({scrollTop: top}, 800);
	});

	$('.btnWrap--priceItem a').hover(
		function(){
			$(this).parents('.priceItem__details').prev().addClass('priceItem__cost--hover');
		},
		function(){
			$(this).parents('.priceItem__details').prev().removeClass('priceItem__cost--hover');
		});

	$(window).scroll(function(){
		var $sections = $('section');
		$sections.each(function(i,el){
			var top  = $(el).offset().top-100;
			var bottom = top +$(el).height();
			var scroll = $(window).scrollTop();
			var id = $(el).attr('id');
			if( scroll > top && scroll < bottom){
				$('li.active').removeClass('active');
				$('a[href="#'+id+'"]').parent().addClass('active');

			}
		})
	});

	$('#scrollup img').click( function(){
		$('body,html').animate({scrollTop:0},800);
		return false;
	});

	$(window).scroll(function(){
		if ( $(document).scrollTop() > 0 ) {
			$('#scrollup').fadeIn('fast');
		} else {
			$('#scrollup').fadeOut('fast');
		}
	});

	$(window).scroll(function(){
		$('section').each(function(){			
			var secTop = $(this).offset().top - 400;
			if ($(window).scrollTop() > secTop) {
				$(this).css("opacity","1");
			}
		});
	});


});