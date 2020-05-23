let imgs = document.querySelectorAll(".imageContainer .img")

imgs.forEach((img) => {
  img.addEventListener("wheel", scrollHandler)
  img.addEventListener("click", select)
  img.addEventListener("click", tapHandler)
  img.addEventListener("touchstart", tapHandler)
})

function deselectAll() {
  imgs.forEach((img) => {
    img.parentElement.dataset.selected = "false"
  })
  enableDraggables()
}

function select(e) {
  let imageContainer = e.currentTarget.parentElement
  let wasSelected = imageContainer.dataset.selected
  deselectAll()
  if (wasSelected === "false") {
    imageContainer.dataset.selected = "true"
    disableDraggables()
  }
}

document.querySelector('.imageContainer').addEventListener("touchstart", tapHandler)

var tappedTwice = false

function tapHandler(e) {
  if (!tappedTwice) {
    tappedTwice = true
    setTimeout(function () {
      tappedTwice = false
    }, 300)
    return false
  }
  e.preventDefault()
  resetImageScale(e)
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
  if (wheelAmount < -10) wheelAmount = -10
  if (wheelAmount > 10) wheelAmount = 10

  let newScale = round(Number.parseFloat(img.dataset.scale) + wheelAmount / 100, 3)
  scaleImage(img, newScale)
}

function scaleImage(img, newScale) {
  if (newScale < 1) newScale = 1
  if (newScale > 5) newScale = 5
  img.style.transform = "scale(" + newScale + ")"
  img.dataset.scale = newScale
  if (newScale == 1) img.style.transform = "none"
}

function round(num, decimals) {
  let decimalsFactor = Math.pow(10, decimals)
  return Math.round((num + Number.EPSILON) * decimalsFactor) / decimalsFactor
}

function moveImage(e) {
  let imageContainer = e.currentTarget.parentElement
  if (imageContainer.dataset.selected !== "true") return
  let img = imageContainer.querySelector(".img")

  let wheelAmount = e.wheelDelta
  if (wheelAmount < -10) wheelAmount = -10
  if (wheelAmount > 10) wheelAmount = 10

  img.dataset.scale = round(
    Number.parseFloat(img.dataset.scale) + wheelAmount / 100,
    3
  )
  if (img.dataset.scale < 1) img.dataset.scale = 1
  if (img.dataset.scale > 5) img.dataset.scale = 5
  img.style.transform = "scale(" + img.dataset.scale + ")"
  if (img.dataset.scale == 1) img.style.transform = "none"
}
