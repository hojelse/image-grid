let imgs = document.querySelectorAll(".imageContainer .img")

imgs.forEach((img) => {
  img.addEventListener("wheel", scrollHandler)
  img.addEventListener("click", select)
  img.addEventListener("click", tapHandler)
  img.addEventListener("touchstart", tapHandler)
  // img.addEventListener("touchstart", moveImage)
})

function deselectAll() {
  imgs.forEach((img) => {
    img.parentElement.dataset.selected = "false"
  })
  enableDraggables()
  enableResizeLayout()
  disablePinchScale()
}

function select(e) {
  let imageContainer = e.currentTarget.parentElement
  let wasSelected = imageContainer.dataset.selected
  deselectAll()
  if (wasSelected === "false") {
    imageContainer.dataset.selected = "true"
    disableDraggables()
    disableResizeLayout()
    enablePinchScale()
  }
}

var tappedTwice = false

function tapHandler(e) {
  if (!tappedTwice){
    tappedTwice = true
    setTimeout(function () {
      tappedTwice = false
    }, 300)
    return false
  }
  e.preventDefault()
  // resetImageScale(e)
}

function resetImageScale(e){
  let imageContainer = e.currentTarget.parentElement
  if (imageContainer.dataset.selected !== "true") return
  let img = imageContainer.querySelector(".img")
  scaleImage(img, 1)
}

function scrollHandler(e) {
  let imageContainer = e.currentTarget.parentElement
  if (imageContainer.dataset.selected !== "true") return
  let img = imageContainer.querySelector(".img")

  let wheelAmount = e.wheelDelta

  newAmount = scaleAmountCap(wheelAmount, img)
  let newScale = round(Number.parseFloat(img.dataset.scale) + newAmount / 100, 3)

  scaleImage(img, newScale)
}

function scaleAmountCap(newAmount) {
  if (newAmount < -10) newAmount = -10
  if (newAmount > 10) newAmount = 10
  return newAmount
}

function scaleImage(img, newScale) {
  if (newScale < 1) newScale = 1
  if (newScale > 5) newScale = 5
  img.dataset.scale = newScale
  setTranforms(img);
}

function round(num, decimals) {
  let decimalsFactor = Math.pow(10, decimals)
  return Math.round((num + Number.EPSILON) * decimalsFactor) / decimalsFactor
}

function moveImage(e) {
  let imageContainer = e.currentTarget.parentElement
  if (imageContainer.dataset.selected !== "true") return
  let img = imageContainer.querySelector(".img")

  // img.dataset.x = img.dataset.x - 10
  setTranforms(img)
}

function setTranforms(img) {
  let dataset = img.dataset;
  if (dataset.scale == 1) {
    img.style.transform = "translate(" + dataset.x + "px, " + dataset.y + "px)"
  } else {
    img.style.transform = "scale(" + dataset.scale + ") translate(" + dataset.x + "px, " + dataset.y + "px)"
  }
}