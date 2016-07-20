$(document).ready(()=> {
  initFooterNavigationHandler()
  initNavbarHandler()
})


function initFooterNavigationHandler () {
  const $footerNavigations = $('.footer__navigation')
  const $main = $('.main')
  $(document).on('click','.footer__navigation', (e) => {
    const item = $(e.currentTarget)
    if (!item.hasClass('active')) {
      item.addClass('active')
      $footerNavigations.not(item).removeClass('active')
    }
    const section = item.attr('id')
    if(section === 'mission') {
      $('#mission-main').addClass('active')
      $('#vision-main').removeClass('active')
    } else {
      $('#mission-main').removeClass('active')
      $('#vision-main').addClass('active')
    }
  })
}

function initNavbarHandler () {
  $(document).on('click','#hamberger-menu', (e) => {
		$(e.currentTarget).toggleClass('open')
    $('.nav-bar__navigation-container').toggleClass('active')
	})
}

function switcher () {
  const $container = $('.switcher-container')
  const $elements = $container.find('.switcher-child')
  `<div class='circle-navigation-container'>
    <div class='circle-navigation'></div>
    <div class='circle-navigation'></div>
    <div class='circle-navigation'></div>
  </div>`

}
