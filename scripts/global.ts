function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function checkCursor(el: Element, evt: MouseEvent) {
    var pos = getMousePos(el, evt);
    var htmlE = el as HTMLElement;

    // handling hovering over resize region
    if (pos.x > note.width - (note.rWidth - 6)
        && pos.x < note.width + 4
        && pos.y > note.height - (note.rHeight - 6)
        && pos.y < note.height + 4) {
        htmlE.style.cursor = "se-resize";
    }
    else {
        htmlE.style.cursor = "auto";
    }
}