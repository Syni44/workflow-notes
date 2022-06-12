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
function checkCursor(el, evt) {
    var pos = getMousePos(el, evt);
    var htmlE = el;
    // handling hovering over resize region
    if (pos.x > note.width - (note.rWidth - 6)
        && pos.x < note.width + 2
        && pos.y > note.height - (note.rHeight - 6)
        && pos.y < note.height + 2) {
        htmlE.style.cursor = "se-resize";
    }
    else {
        htmlE.style.cursor = "auto";
    }
}
//# sourceMappingURL=global.js.map