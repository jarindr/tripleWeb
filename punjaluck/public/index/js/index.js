$(document).ready(()=> {
  initFooterNavigationHandler()
})


function initFooterNavigationHandler() {
  const $footerNavigations = $('.footer__navigation')
  const $main = $('.main')
  $(document).on('click','.footer__navigation', (e) => {
    const item = $(e.currentTarget)
    if (!item.hasClass('active')) {
      item.addClass('active')
      $footerNavigations.not(item).removeClass('active')
    }
    const section = item.attr('id')
    console.log(section)
    if(section === 'mission') {
      $('#mission-main').addClass('active')
      $('#vision-main').removeClass('active')
    } else{
      $('#mission-main').removeClass('active')
      $('#vision-main').addClass('active')
    }
  })
}
