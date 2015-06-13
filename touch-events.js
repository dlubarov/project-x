$('.slide2').hide()
function touchEvent(event) {
  if (event == 'switch') {
    $('.slide1').toggle()
    $('.slide2').toggle()
  }
}
