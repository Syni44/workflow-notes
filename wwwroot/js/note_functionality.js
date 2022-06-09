var div = document.getElementById("d-main");
var observations = { childList: true };
var note;
var callback = function (mutationList, observer) {
    document.querySelectorAll('[id^=note]').forEach(function (el) {
        note = JSON.parse(el.getAttribute("note"));
        if (note != null) {
            el.addEventListener("click", handleCloseWithX);
        }
        el.addEventListener("mouseenter", function (evt) {
            console.log(el.id);
        }, false);
    });
};
function handleCloseWithX(evt) {
    var pos = getMousePos(this, evt);
    if (pos.x > note.width - note.xWidth + note.xMargins
        && pos.x < note.width - note.xMargins
        && pos.y < note.xHeight - note.xMargins) {
        this.remove();
    }
    else {
        console.log(this.id);
    }
}
var observer = new MutationObserver(callback);
observer.observe(div, observations);
function debug(evt) {
    console.log(evt.target.x, evt.target.y);
}
//# sourceMappingURL=note_functionality.js.map