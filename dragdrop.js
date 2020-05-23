// Credit to Rudi Szabó, modified
// https://codepen.io/szrudi/details/gOpLyKd

initDragAndDrop();

function initDragAndDrop() {
    let draggables = document.querySelectorAll(".draggable");
    let dropZones = document.querySelectorAll(".drop-zone");
    initDraggables(draggables);
    initDropZones(dropZones);
}

function initDraggables(draggables) {
    for (const draggable of draggables) {
        initDraggable(draggable);
    }
}

function initDropZones(dropZones) {
    for (let dropZone of dropZones) {
        initDropZone(dropZone);
    }
}

// touchInit();
// function touchInit(){
//     document.addEventListener('touchstart', handler, true);
//     document.addEventListener('touchmove', handler, true);
//     document.addEventListener('touchend', handler, true);
//     document.addEventListener('touchleave', handler, true);
//     document.addEventListener('touchcancel', handler, true);        
// };
// function handler(e) {
//     console.log(e);
// }

function initDraggable(draggable) {
    draggable.addEventListener("dragstart", dragStartHandler);
    draggable.addEventListener("drag", dragHandler);
    draggable.addEventListener("dragend", dragEndHandler);
    draggable.setAttribute("draggable", "true");
}

function initDropZone(dropZone) {
    dropZone.addEventListener("dragenter", dropZoneEnterHandler);
    dropZone.addEventListener("dragover", dropZoneOverHandler);
    dropZone.addEventListener("dragleave", dropZoneLeaveHandler);
    dropZone.addEventListener("drop", dropZoneDropHandler);    
}

function dragStartHandler(e) {
    fromDropZone = e.currentTarget.parentElement
    
    setDropZonesHighlight();
    this.classList.add('dragged', 'drag-feedback');
    e.dataTransfer.setData("type/dragged-box", 'dragged');
    e.dataTransfer.setData("text/plain", this.textContent.trim());   
    deferredOriginChanges(this, 'drag-feedback');
}

function dragHandler(e) {
    // TODO
}

function dragEndHandler(e) {    
    setDropZonesHighlight(false);
    this.classList.remove('dragged');
    
    dropOnMobile(e);
}

function dropOnMobile(e) {
    let fromImage = e.srcElement;
    let toImage = document.elementFromPoint(e.screenX, e.screenY);
    
    if (toImage === null || toImage === undefined) return;
    if (!toImage.classList.contains('img')) return;
    
    let fromContainer = fromImage.parentElement;
    let toContainer = toImage.parentElement;

    toContainer.appendChild(fromImage);
    fromContainer.appendChild(toImage);
}

function dropZoneEnterHandler(e) {
    currentDropZone = e.toElement.parentElement
    if (e.dataTransfer.types.includes('type/dragged-box')) {
        this.classList.add("over-zone");
        e.preventDefault();
    }
}

function dropZoneOverHandler(e) {
    currentDropZone = e.toElement.parentElement
    if (e.dataTransfer.types.includes('type/dragged-box')) {
        e.preventDefault();
    }
}

function dropZoneLeaveHandler(e) {
        if (e.dataTransfer.types.includes('type/dragged-box') &&
        e.relatedTarget !== null &&
        e.currentTarget !== e.relatedTarget.closest('.drop-zone')) {
        this.classList.remove("over-zone");
    }
}

function dropZoneDropHandler(e) {
    let draggedElement = document.querySelector('.dragged');
    let from = draggedElement.parentElement;
    e.currentTarget.appendChild(draggedElement);
    from.appendChild(e.currentTarget.querySelector(".draggable"));
    e.preventDefault();
}

function setDropZonesHighlight(highlight = true) {
    const dropZones = document.querySelectorAll(".drop-zone");
    for (const dropZone of dropZones) {
        if (highlight) {
            dropZone.classList.add("active-zone");
        } else {
            dropZone.classList.remove("active-zone");
            dropZone.classList.remove("over-zone");
        }
    }
}

function deferredOriginChanges(origin, dragFeedbackClassName) {
    setTimeout(() => {
        origin.classList.remove(dragFeedbackClassName);
    });
}

function disableDraggables() {
    let draggables = document.querySelectorAll(".draggable");
    draggables.forEach(draggable => {
        draggable.setAttribute("draggable", "false");
    });
}

function enableDraggables() {
    let draggables = document.querySelectorAll(".draggable");
    draggables.forEach(draggable => {
        draggable.setAttribute("draggable", "true");
    });
}
