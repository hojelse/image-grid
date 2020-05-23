let resizeLayoutDisabled = false;

function disableResizeLayout() {
  resizeLayoutDisabled = true;
}

function enableResizeLayout() {
  resizeLayoutDisabled = false;
}

init()

function init(){
  const imagePairs = document.querySelectorAll('.imagePair')
  for (let i = 0; i < imagePairs.length; i++) {
    makeResizableDiv(imagePairs[i])
  }
}

function makeResizableDiv(imagePair) {
  const imageContainer0 = imagePair.querySelector('.imageContainer[data-pos="0"]')
  const imageContainer1 = imagePair.querySelector('.imageContainer[data-pos="1"]')
  const resizer = imagePair.querySelector('.resizer')

  const minimum_size = 0.05
  let original_height_1 = 0
  let original_y_1 = 0
  let original_mouse_y = 0
  if(resizer != undefined) setUp(resizer)

  function setUp(currentResizer) {
    currentResizer.addEventListener('mousedown', e => handleMouseStart(e))
    currentResizer.addEventListener("touchstart", e => handleTouchStart(e), false)
  }

  function handleMouseStart(e) {
    setOriginalHeights(e)
    original_mouse_y = e.pageY
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseEnd)
  }

  function handleMouseMove(e) {
    const height_1 = original_height_1 + (e.pageY - original_mouse_y)
    handleMove(height_1)
  }

  function handleMouseEnd() {
    window.removeEventListener('mousemove', handleMouseMove)
  }

  function handleTouchStart(e) {
    setOriginalHeights(e)
    original_mouse_y = e.touches[0].clientY
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)
  }

  function handleTouchMove(e) {
    const height_1 = original_height_1 + (e.touches[0].clientY - original_mouse_y)
    handleMove(height_1)
  }

  function handleTouchEnd() {
    window.removeEventListener('touchmove', handleTouchMove)
  }

  function setOriginalHeights(e) {
    e.preventDefault()
    original_height_1 = parseFloat(getComputedStyle(imageContainer0, null).getPropertyValue('height').replace('px', ''))
    original_height_images = parseFloat(getComputedStyle(imagePair, null).getPropertyValue('height').replace('px', ''))
    original_y_1 = imageContainer0.getBoundingClientRect().top
  }

  function handleMove(height_1){
    if(resizeLayoutDisabled) return;
    const height_2 = original_height_images - height_1
    let new_flex_1 = round(height_1 / original_height_images, 3)
    let new_flex_2 = round(height_2 / original_height_images, 3)
    if (new_flex_1 > minimum_size && new_flex_2 > minimum_size) {
      imageContainer0.style.flexGrow = new_flex_1
      imageContainer1.style.flexGrow = new_flex_2
    }
  }
}

function round(num, decimals){
  let decimalsFactor = Math.pow(10, decimals)
  return Math.round((num + Number.EPSILON) * decimalsFactor) / decimalsFactor
}
