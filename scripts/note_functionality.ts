const div = document.getElementById("d-main") as HTMLDivElement;
const observations = { childList: true };
var note: Note;

const callback = function (mutationList, observer) {
    document.querySelectorAll('[id^=note]').forEach((el) => {
        note = JSON.parse(el.getAttribute("note")) as Note;

        if (note != null) {
            el.addEventListener("click", handleCloseWithX);
        }

        el.addEventListener("mouseenter", function (evt) {
            console.log(el.id);
        }, false);
    });
}

function handleCloseWithX(evt: MouseEvent) {
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

const observer = new MutationObserver(callback);
observer.observe(div, observations);

function debug(evt) {
    console.log(evt.target.x, evt.target.y);
}