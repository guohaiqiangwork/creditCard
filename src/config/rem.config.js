// 1rem = 37.5px, 在使用此框架时，请勿使用px为计量单位。以750的设计稿为基础，1px转化为0.01rem

export default function () {
  let deviceWidth = document.documentElement.clientWidth
  if (deviceWidth > 750) {
    deviceWidth = 414
  }
  if (deviceWidth <= 320) {
    deviceWidth = 320
  }
  document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px'
  
  // 禁止双击放大
  document.documentElement.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault()
    }
  }, false)
  let lastTouchEnd = 0
  document.documentElement.addEventListener('touchend', function (event) {
    let now = Date.now()
    if (now - lastTouchEnd <= 300) {
      event.preventDefault()
    }
    lastTouchEnd = now
  }, false)
}
