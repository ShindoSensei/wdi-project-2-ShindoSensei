// (function ($) {
//
// new WOW().init()
//
// $(window).load(function () {
//   $('#preloader').delay(100).fadeOut('slow')
//   $('#load').delay(100).fadeOut('slow')
// })
// $(document).ready(function () {
//   $(this).scrollTop(0)
// })
	// jQuery to collapse the navbar on scroll
$(window).scroll(function () {
  if ($('.navbar').offset().top > 50) {
    $('.navbar-fixed-top').addClass('top-nav-collapse')
  } else {
    $('.navbar-fixed-top').removeClass('top-nav-collapse')
  }
})

	// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function () {
  $('.navbar-nav li a').bind('click', function (event) {
    var $anchor = $(this)
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top
    }, 1500, 'easeInOutExpo')
    event.preventDefault()
  })
  $('.page-scroll a').bind('click', function (event) {
    var $anchor = $(this)
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top
    }, 1500, 'easeInOutExpo')
    event.preventDefault()
  })
})

// })(jQuery);