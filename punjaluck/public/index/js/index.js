$(document).ready(()=> {
  animateLogo()
})

function animateLogo () {
  const $container = $('.charm-text')
  let delay = 800
  $container.find('div').each( (index,el) => {
    addClassDelay(el,'flip',delay)
    delay += 500
  })
}

function addClassDelay (el,className,delay) {
  setTimeout(() => {
    $(el).addClass(className)
  }, delay)

}
