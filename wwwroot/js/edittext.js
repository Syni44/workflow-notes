var editTextOffsetX = 4;
var editTextOffsetY = 22;
function createTextArea(el, evt) {
    // using global 'note's here may result in the wrong canvas being
    // referenced!
    var editText = document.createElement("textarea");
    editText.id = el.id + "Text";
    editText.className = el.className;
    editText.rows = Math.floor(note.height / note.lineHeight) - 2;
    editText.cols = (note.width / 8) - 2;
    editText.maxLength = editText.rows * editText.cols;
    editText.placeholder = "Write a note here...";
    editText.spellcheck = false;
    editText.wrap = "hard";
    editText.style.zIndex = "3";
    editText.style.left = parseInt(el.style.left) + editTextOffsetX + "px";
    editText.style.top = parseInt(el.style.top) + editTextOffsetY + "px";
    editText.addEventListener("keydown", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            el.animate(errorShakeAnim, errorShakeTiming);
            editText.animate(errorShakeAnim, errorShakeTiming);
        }
    });
    el.parentElement.insertBefore(editText, el);
    editText.focus();
}
function moveText(name, x, y) {
    var eText = document.getElementById(name + "Text");
    // pointerEvents style to allow interacting with canvas behind
    eText.style.pointerEvents = "none";
    eText.style.left = parseInt(x) + editTextOffsetX + "px";
    eText.style.top = parseInt(y) + editTextOffsetY + "px";
}
//# sourceMappingURL=edittext.js.map