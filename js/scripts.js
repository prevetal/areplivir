$(() => {
	// Где купить - Загрузить еще
	$('.where_buy_block .load_more button').click(function (e) {
		e.preventDefault()

		$('.where_buy_block .item.hide').fadeIn(300)
		$(this).remove()
	})


	// Всплывашка подтверждения
	if (get_cookie('confirm_modal') == null) {
		$.fancybox.open({
			src: '#confirm_modal',
			type: 'inline',
			touch: false,
			modal: true
		})
	}

	$('#confirm_modal .links .close').click(() => {
		document.cookie = 'confirm_modal=false'
	})


	// Главная страница
	if ($('.one_page').length) {
		$('.one_page').onepage_scroll({
			sectionContainer: '.one_page section',
			easing: 'linear',
			animationTime: 500,
			pagination: false,
			updateURL: false,
			loop: false,
			keyboard: true,
			responsiveFallback: 1023,
			direction: 'vertical',
			afterMove: index => {
				setTimeout(() => {
					$('.page_anchors button').removeClass('active')
					$('.page_anchors .cont > *:eq(' + (index - 1) + ') button').addClass('active')
				})
			}
		})
	}


	$('.page_anchors button:not(.scroll_btn)').click(function (e) {
		e.preventDefault()

		let sectionIndex = $(this).data('anchor')

		$('.one_page').moveTo(sectionIndex)
	})


	// Плавная прокрутка к якорю
	$('.scroll_btn').click(function (e) {
		e.preventDefault()

		let href = $(this).data('anchor'),
			addOffset = 120

		if ($(this).data('offset')) addOffset = $(this).data('offset')

		$('html, body').stop().animate({ scrollTop: $(href).offset().top - addOffset }, 1000)
	})
})



$(window).on('load', () => {
	// Фикс. шапка
	headerInit = true,
		headerHeight = $('header').outerHeight()

	$('header').wrap('<div class="header_wrap"></div>')
	$('.header_wrap').height(headerHeight)

	headerInit && $(window).scrollTop() > 0
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')


	// Статьи
	let articles = $('.articles .row'),
		articlesGutter = parseInt(articles.css('--articles_gutter'))

	masonry = articles.masonry({
		percentPosition: true,
		gutter: articlesGutter,
		itemSelector: '.article',
		columnWidth: articles.find('.article').width()
	})


	$('.articles .load_more button').click((e) => {
		e.preventDefault()

		let items = '' // Аякс запросом пулачить новые статьи в переменную.

		masonry.append(items).masonry('appended', items).masonry()
	})


	// Плавная прокрутка к якорю
	$('.scroll_link').click(function (e) {
		e.preventDefault()

		let href = $(this).data('anchor'),
			addOffset = $('header').height() + 40

		if ($(this).data('offset')) addOffset = $(this).data('offset')

		$('html, body').stop().animate({ scrollTop: $(href).offset().top - addOffset }, 1000)
	})


	// Фикс. блок
	$('.sticky').stick_in_parent({
		offset_top: $('header').height() + 20
	})
})



$(window).resize(() => {
	// Фикс. шапка
	headerInit = false
	$('.header_wrap').height('auto')

	setTimeout(() => {
		headerInit = true
		headerHeight = $('header').outerHeight()

		$('.header_wrap').height(headerHeight)

		headerInit && $(window).scrollTop() > 0
			? $('header').addClass('fixed')
			: $('header').removeClass('fixed')
	}, 100)


	// Статьи
	setTimeout(() => {
		let articles = $('.articles .row'),
			articlesGutter = parseInt(articles.css('--articles_gutter'))

		masonry = articles.masonry({
			percentPosition: true,
			gutter: articlesGutter,
			itemSelector: '.article',
			columnWidth: articles.find('.article').width()
		})
	})
})



$(window).scroll(() => {
	// Фикс. шапка
	typeof headerInit !== 'undefined' && headerInit && $(window).scrollTop() > 0
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')
})



function get_cookie(cookie_name) {
	var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)')

	if (results)
		return (unescape(results[2]))
	else
		return null
}