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

$(document).ready( () => {
  History.Adapter.trigger(window, 'statechange')
  if(window.location.pathname === '/')  History.pushState({ target: 'about' }, null , `/about`)

  initFooterNavigationHandler()
  initNavbarHandler()
  initSlider('#slider1')
  initSlider('#slider2')
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

function initSlider (sliderId) {
  $(sliderId).find('.slider-content').each((index,el) => {
    const id = $(el).attr('id')
    const triggerClass = `trigger-${id}`
    const active = index === 0 ? 'active':''
    const element = `<div class='circle-navigation ${active} ${triggerClass}'></div>`
    $(document).on('click',`.${triggerClass}`,(e) => {
      const keyWord = triggerClass.split('-')[1]
      const contentId = `${keyWord}-page`
      const button = $(e.currentTarget)
      $(sliderId).find('.slider-content').each((index,el)=>{
        const targetId = $(el).attr('id')
        if(targetId !== contentId){
          $(`#${targetId}`).removeClass('active')
        }else{
          $(`#${targetId}`).addClass('active')
        }
      })
      button.addClass('active')
      $(sliderId).find('.circle-navigation').not(button).removeClass('active')
    })
    $(sliderId).find('.circle-navigation-container').append(element)
  })
}
