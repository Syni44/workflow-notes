const editTextOffsetX = 4;
const editTextOffsetY = 22;

function createTextArea(el, evt) {
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
    editText.style.left = parseInt((el as HTMLElement).style.left) + editTextOffsetX + "px";
    editText.style.top = parseInt((el as HTMLElement).style.top) + editTextOffsetY + "px";

    el.parentElement.insertBefore(editText, el);
    editText.focus();
}

function moveText(name, x: string, y: string) {
    var eText = document.getElementById(name + "Text");

    eText.style.left = parseInt(x) + editTextOffsetX + "px";
    eText.style.top = parseInt(y) + editTextOffsetY + "px";
}