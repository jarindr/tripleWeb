$(document).ready( () => {
  initNavbarHandler()
  initSideBarNav()
  bindScrollEvent()
  $('#slider1').unslider()
  handleClickEvents()
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

function handleClickEvents() {
  $('.collapse--faq').click((e) => {
    const $target = $(e.currentTarget)
    $target.toggleClass('active')
    $target.siblings().removeClass('active')
    $target.find('.collapse-content').slideToggle('fast')
    $target.siblings().find('.collapse-content').slideUp('fast')
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
