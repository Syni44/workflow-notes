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
        && pos.x < note.width + 4
        && pos.y > note.height - (note.rHeight - 6)
        && pos.y < note.height + 4) {
        htmlE.style.cursor = "se-resize";
    }
    else {
        htmlE.style.cursor = "auto";
    }
}
var errorShakeAnim = [
    { transform: 'translateX(-5px)' },
    { transform: 'translateX(10px)' },
    { transform: 'translateX(-10px)' },
    { transform: 'translateX(5px)' }
];
var errorShakeTiming = {
    duration: 160,
    iterations: 1,
};
//# sourceMappingURL=global.js.map