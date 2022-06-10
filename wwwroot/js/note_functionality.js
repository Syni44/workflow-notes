var div = document.getElementById("d-main");
var divObservations = { childList: true };
var note;
var dragPoint = { x: 0, y: 0 };
var dragging = false;
var divCallback = function (mutationList, observer) {
    // click and drag: mouse up
    mutationList[0].target.addEventListener("mouseup", function () { return dragging = false; });
    // todo: i believe this portion is causing a lot of unnecessary duplication
    // check console logs
    document.querySelectorAll('[id^=note]').forEach(function (el) {
        note = JSON.parse(el.getAttribute("note"));
        if (note != null) {
            // watch for clicks on each note canvas
            el.addEventListener("click", handleNoteClicked);
            // click and drag: mouse down
            el.addEventListener("mousedown", function (evt) {
                if (evt.button === 0) {
                    var pos = getMousePos(el, evt);
                    var canvasPos = {
                        x: parseInt(note.x, 10) + pos.x,
                        y: parseInt(note.y, 10) + pos.y
                    };
                    dragging = true;
                    dragPoint = { x: canvasPos.x, y: canvasPos.y };
                }
            });
            // click and drag: mouse moving
            el.addEventListener("mousemove", handleDragging);
            // watch for attribute changes within each canvas -- specifically,
            // the note.x and note.y coordinates will be changing when moved
            var noteObserver = new MutationObserver(noteCallback);
            noteObserver.observe(el, noteObservations);
        }
        el.addEventListener("mouseenter", function (evt) {
            console.log(el.id);
        }, false);
    });
};
function handleNoteClicked(evt) {
    var pos = getMousePos(this, evt);
    // handling close note via clicking on X region
    if (pos.x > note.width - note.xWidth
        && pos.x < note.width
        && pos.y < note.xHeight) {
        this.remove();
    }
}
function handleDragging(evt) {
    if (dragging) {
        var pos = getMousePos(canvas, evt);
        var parsedX = parseInt(note.x, 10);
        var parsedY = parseInt(note.y, 10);
        note.x = Math.floor(parsedX - (dragPoint.x - pos.x)) + "px";
        note.y = Math.floor(parsedY - (dragPoint.y - pos.y)) + "px";
        dragPoint = { x: pos.x, y: pos.y };
        this.setAttribute("note", JSON.stringify(note));
    }
}
var divObserver = new MutationObserver(divCallback);
divObserver.observe(div, divObservations);
function debug(evt) {
    console.log(evt.target.x, evt.target.y);
}
//# sourceMappingURL=note_functionality.js.map