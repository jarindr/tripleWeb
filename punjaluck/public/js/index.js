$(document).ready(function () {
  animateLogo()
})

function animateLogo () {
  var $container = $('.charm-text')
  var delay = 800
  $container.find('div').each(function (index,el) {
    addClassDelay(el,'flip',delay)
    delay += 500
  })
}

function addClassDelay(el,className,delay) {
  setTimeout(function () {
    $(el).addClass(className)
  }, delay)

}
