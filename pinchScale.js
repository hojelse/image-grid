// Global vars to cache event state
var evCache = new Array();
var prevDiff = -1;

let pinchScaleDisabled = true;

function disablePinchScale() {
  pinchScaleDisabled = true;
}

function enablePinchScale() {
  pinchScaleDisabled = false;
}

initPinchScale();

function initPinchScale() {
    let pinchScalable = document.querySelector(".pageContainer")
    initPinchScalable(pinchScalable)
}

function initPinchScalable(el) {
  // Install event handlers for the pointer target
  el.onpointerdown = pointerdown_handler;
  el.onpointermove = pointermove_handler;
 
  // Use same handler for pointer{up,cancel,out,leave} events since
  // the semantics for these events - in this app - are the same.
  el.onpointerup = pointerup_handler;
  el.onpointercancel = pointerup_handler;
  el.onpointerout = pointerup_handler;
  el.onpointerleave = pointerup_handler;
 }

 function pointerdown_handler(ev) {
  if(pinchScaleDisabled) return;
  // The pointerdown event signals the start of a touch interaction.
  // This event is cached to support 2-finger gestures
  evCache.push(ev);
  // console.log("pointerDown", ev);
 }

 function pointermove_handler(ev) {
  if(pinchScaleDisabled) return;
  // This function implements a 2-pointer horizontal pinch/zoom gesture. 
  //
  // If the distance between the two pointers has increased (zoom in), 
  // the target element's background is changed to "pink" and if the 
  // distance is decreasing (zoom out), the color is changed to "lightblue".
  //
  // This function sets the target element's border to "dashed" to visually
  // indicate the pointer's target received a move event.
  // console.log("pointerMove", ev);
 
  // Find this event in the cache and update its record with this event
  for (var i = 0; i < evCache.length; i++) {
    if (ev.pointerId == evCache[i].pointerId) {
       evCache[i] = ev;
    break;
    }
  }
 
  // If two pointers are down, check for pinch gestures
  if (evCache.length == 2) {
    // Calculate the distance between the two pointers
    var curDiff = Math.abs(evCache[0].clientX - evCache[1].clientX);
 
    if (prevDiff > 0) {
      if (curDiff > prevDiff) {
        // The distance between the two pointers has increased
        // console.log("Pinch moving OUT -> Zoom in", ev);
        // ev.target.style.background = "pink";
        let imageContainer = document.querySelector(".imageContainer[data-selected='true']");
        let img = imageContainer.querySelector(".img")
        let newAmount = scaleAmountCap(curDiff - prevDiff);
        console.log(newAmount);

        let newScale = round(Number.parseFloat(img.dataset.scale) + newAmount / 200, 3)
        scaleImage(img, newScale);
      }
      if (curDiff < prevDiff) {
        // The distance between the two pointers has decreased
        console.log("Pinch moving IN -> Zoom out",ev);
        // ev.target.style.background = "lightblue";
        let imageContainer = document.querySelector(".imageContainer[data-selected='true']");
        let img = imageContainer.querySelector(".img")
        let newAmount = scaleAmountCap(curDiff - prevDiff);
        console.log(newAmount);

        let newScale = round(Number.parseFloat(img.dataset.scale) + newAmount / 200, 3)       
        scaleImage(img, newScale);
      }
    }
 
    // Cache the distance for the next move event 
    prevDiff = curDiff;
  }
 }

 function pointerup_handler(ev) {
  // console.log(ev.type, ev);
  // Remove this pointer from the cache and reset the target's
  // background and border
  remove_event(ev);
  // body.style.backgroundColor = "white";

  // If the number of pointers down is less than two then reset diff tracker
  if (evCache.length < 2) {
    prevDiff = -1;
  }
}

function remove_event(ev) {
  // Remove this event from the target's cache
  for (var i = 0; i < evCache.length; i++) {
    if (evCache[i].pointerId == ev.pointerId) {
      evCache.splice(i, 1);
      break;
    }
  }
 }