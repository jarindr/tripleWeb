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
  Slider('#slider-board').init()
  const $window = $(window)
  const $video = $('#punjaluck-animate')
  $video[0].onended = () => {
    $video.remove()
    $('.corporate-quote').css({ opacity: 1 })
  }
  window.addEventListener('scroll', ()=>{
    const scrollPosition = $window.scrollTop()
    playVideo($video, scrollPosition)
    $('.parallax').each((index,el) => {
      parallax($(el), scrollPosition)
    })
  })
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


function parallax (target,scrollPosition) {
  const parent = target.parent()
  const bottom = parent.position().top + parent.offset().top + parent.outerHeight(true)
  const top = parent.position().top
  if (bottom > scrollPosition && top < scrollPosition) {
    const move = parseInt((scrollPosition -  top)/3)
    target.css({
      transform: `translate3d(0,${move}px,0)`
    })
  }
}

function playVideo (video, scrollPosition) {
  const position = video.position()
  if (position.top < scrollPosition + $(window).height()){
    video[0].play()
  }
}

function Slider (sliderId) {
  return {
    init (){
      this.createSlider()
    },
    createSlider () {
      $(sliderId).children('.slider-content').each((index,el) => {
        const id = $(el).attr('id')
        const triggerClass =`trigger-${id}`
        this.createNavigation(index,triggerClass)
        this.createClickEventBinder(triggerClass)
      })
    },

    createNavigation (index,triggerClass) {
      const active = index === 0 ? 'active':''
      const element = `<div class='circle-navigation ${active} ${triggerClass}'></div>`
      $(sliderId).children('.circle-navigation-container').append(element)
    },
    createClickEventBinder (triggerClass) {
      $(document).on('click',`.${triggerClass}`,(e) => {
        const keyWord = triggerClass.split('-')[1]
        const contentId = `${keyWord}`
        const button = $(e.currentTarget)
        $(sliderId).children('.slider-content').each((index,el)=>{
          const targetId = $(el).attr('id')
          if(targetId !== contentId){
            $(`#${targetId}`).removeClass('active')
          }else{
            $(`#${targetId}`).addClass('active')
          }
        })
        button.addClass('active')
        $(sliderId).children('.circle-navigation-container').children('.circle-navigation').not(button).removeClass('active')
        if($(`#${contentId}`).css('background-color') === 'rgb(255, 255, 255)'){
          $('.circle-navigation').removeAttr("style").css({'border-color':'#8b8b8b'})
          $('.circle-navigation.active').css({'background-color':'#8b8b8b'})
        }else{
          $('.circle-navigation').removeAttr("style").css({'border-color':'white'})
          $('.circle-navigation.active').css({'background-color':'white'})
        }
      })
    }
  }
}
