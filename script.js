let body = document.querySelector('body')
let pageContainer = document.querySelector(".pageContainer")
let page = document.querySelector(".page")

let height = 1
let width = 1
let documentIsWide

window.onresize = resizePage
resizePage()

function resizePage() {
  bodyIsWide = body.offsetHeight / body.offsetWidth < height
  if (bodyIsWide) {
    pageContainer.style.flexDirection = "column"
    pageContainer.style.maxHeight = "none"
    page.style.width = pageContainer.offsetHeight * width + "px"
    page.style.height = "auto"
  } else {
    pageContainer.style.flexDirection = "row"
    pageContainer.style.maxHeight = pageContainer.offsetWidth * height + "px"
    page.style.width = "auto"
    page.style.height = "100%"
  }
}
