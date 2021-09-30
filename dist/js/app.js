$(function() {
	// sp用メニュー
	$('.js-toggle-menu').on('click', function() {
		$('.js-toggle-menu-target').toggleClass('is-active');
	});
	//項目がクリックされたら閉じる
  $('.js-toggle-menu-target a').on('click', function() {
    $('.js-toggle-menu').trigger('click');
  });
});