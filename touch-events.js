function touchEvent(event) {
  if (event == 'switch') {
    $('.slide1').toggle()
    $('.slide2').toggle()
  } else if (event == 'clockwise'){
    modifyActiveId(true, getEventList())
    refreshAll()
    hardRefreshMap()
  } else if (event == 'counterclockwise'){
    modifyActiveId(false, getEventList())
    refreshAll()
    hardRefreshMap()
  }
}
