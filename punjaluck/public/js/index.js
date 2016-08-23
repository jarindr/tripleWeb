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
  initFooterNavigationHandler()
  initNavbarHandler()
  initSideBarNav()
  bindScrollEvent()
  $('#slider1').unslider()
  $('.xbutton').click((e) => {
    const $target = $(e.currentTarget)
    $target.toggleClass('active')
    $target.parent().siblings('.collapse-content').slideToggle('fast')
    console.log(  $target.closest())
  })
})


function initSideBarNav () {
  let dots = ''
  $('.section').each((index, el) => {
    const id = $(el).prop('id')
    dots += `<div class='dot-nav'>${id}</div>`
  })
  const htmlDots = $.parseHTML(dots)
  $(htmlDots).appendTo($('.side-navigation'))
}

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

function bindScrollEvent () {
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
    $('.dot-nav').each((index,el) => {
      const id = $(el).text()
      const $section = $(`#${id}`)
      const top = $section.offset().top - 71
      const bottom = top + $section.outerHeight(true)
      if(bottom > scrollPosition && top < scrollPosition) {
        $(el).addClass('active')
      } else {
        $(el).removeClass('active')
      }
    })
  })
}

function initNavbarHandler () {
  $(document).on('click','#hamberger-menu', (e) => {
    $(e.currentTarget).toggleClass('open')
    $('.nav-bar__navigation-container').toggleClass('active')
  })
  $(document).on('click','.dot-nav', (e) => {
    const top = $(`#${$(e.currentTarget).text()}`).offset().top - 70
    $('html, body').animate({
        scrollTop: top
      }, 500)
  })
}


function parallax (target,scrollPosition) {
  const parent = target.parent()
  const bottom = parent.offset().top + parent.outerHeight(true) - 70
  const top = parent.position().top
  if (bottom > scrollPosition && top  < scrollPosition) {
    const move = parseInt((scrollPosition -  top)/4)
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
