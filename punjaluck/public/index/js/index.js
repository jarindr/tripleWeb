(function(window,undefined){

  // Bind to StateChange Event
  History.Adapter.bind(window,'statechange', () => { // Note: We are using statechange instead of popstate
    const state = History.getState()
    const target = state.data.target

    switch (target) {

      case 'about':
      $('#about-page').addClass('active')
      $('#partner-page').removeClass('active')
      $('#about').addClass('active')
      $('#partner').removeClass('active')
      break

      case 'partner':
      $('#about-page').removeClass('active')
      $('#partner-page').addClass('active')
      $('#partner').addClass('active')
      $('#about').removeClass('active')
      break

      default:

    }
  })
  // Change our States

})(window)

$(document).ready(()=> {
  History.Adapter.trigger(window, 'statechange')
  if(window.location.pathname === '/')  History.pushState({ target: 'about' }, null , `/about`)
  initFooterNavigationHandler()
  initNavbarHandler()
})


function initFooterNavigationHandler () {
  const $footerNavigations = $('.footer__navigation')
  const $main = $('.main')

  $(document).on('click','.footer__navigation', (e) => {
    const item = $(e.currentTarget)
    item.addClass('active')
    $footerNavigations.not(item).removeClass('active')

    const section = item.attr('id')
    History.pushState({ target: section }, null , `/${section}`)

  })
}

function initNavbarHandler () {
  $(document).on('click','#hamberger-menu', (e) => {
    $(e.currentTarget).toggleClass('open')
    $('.nav-bar__navigation-container').toggleClass('active')
  })
}
