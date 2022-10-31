const div = document.getElementById("d-main") as HTMLDivElement;
const divObservations = { childList: true };
var note: Note;
var dragPoint = { x: 0, y: 0 };
let dragging: boolean = false;
var resizePoint = { x: 0, y: 0 };
let resizing: boolean = false;

const divCallback = function (mutationList, observer) {
    // click and drag: mouse up
    mutationList[0].target.addEventListener("mouseup", () => dragging = false);
    mutationList[0].target.addEventListener("mouseup", () => resizing = false);

    // iterate through all notes and assign listeners as necessary
    document.querySelectorAll('[id^=note]').forEach((el) => {
        // don't attach listeners if they already exist
        if (el.getAttribute("listenersAttached") == 'false') {
            note = JSON.parse(el.getAttribute("note")) as Note;

            if (note != null) {
                // click and drag: mouse down
                el.addEventListener("mousedown", (evt: MouseEvent) => {
                    var allChildNodes = document.querySelectorAll('[id^=note]');
                    insertAfter(el, allChildNodes[allChildNodes.length - 1]);
                    if (el.getAttribute("textAreaExists") == "true") {
                        insertAfter(document.getElementById(el.id + "Text"), el);
                    }

                    document.getElementById(el.id).style.zIndex = '3';
                    allChildNodes.forEach(child => {
                        if (document.getElementById(child.id) != document.getElementById(el.id + "Text")) {
                            document.getElementById(child.id).style.zIndex = '2';
                        }
                    });

                    // left click on note functionality
                    // drag and drop, close note, resize note
                    if (evt.button === 0 && evt.detail == 1) {
                        var pos = getMousePos(el, evt);

                        // handling close note via clicking on X region
                        if (pos.x > note.width - note.xWidth
                            && pos.x < note.width
                            && pos.y < note.xHeight) {
                            if (el.getAttribute("textAreaExists") == "true") {
                                var eText = document.getElementById(el.id + "Text");
                                eText.remove();
                            }

                            el.remove();
                        }
                        // handling resize region
                        else if (pos.x > note.width - (note.rWidth - 6)
                            && pos.x < note.width + 4
                            && pos.y > note.height - (note.rHeight - 6)
                            && pos.y < note.height + 4) {
                            // todo: something's broken here or in handledragging function

                            var canvasPos = {
                                x: parseInt(note.x, 10) + pos.x,
                                y: parseInt(note.y, 10) + pos.y
                            };

                            resizing = true;
                            resizePoint = { x: canvasPos.x, y: canvasPos.y };
                        }
                        else {
                            var canvasPos = {
                                x: parseInt(note.x, 10) + pos.x,
                                y: parseInt(note.y, 10) + pos.y
                            };

                            dragging = true;
                            dragPoint = { x: canvasPos.x, y: canvasPos.y };
                        }
                    }
                    // right click on note functionality
                    // open contextmenu
                    else if (evt.button === 2 && evt.detail == 1) {
                        openMenu(el, evt);
                    }
                    // double click to edit text area
                    else if (evt.detail == 2) {
                        if (el.getAttribute("textAreaExists") == 'false') {
                            createTextArea(el, evt);
                        }
                        else {
                            var eText = document.getElementById(el.id + "Text");
                            eText.style.pointerEvents = "auto";
                        }
                    }
                });

                // click and drag: mouse moving
                el.addEventListener("mousemove", handleDragging);

                // prevent default contextmenu
                el.addEventListener("contextmenu", (evt) => evt.preventDefault());

                // watch for attribute changes within each canvas -- specifically,
                // the note.x and note.y coordinates will be changing when moved
                const noteObserver = new MutationObserver(noteCallback);
                noteObserver.observe(el, noteObservations);
            }

            el.addEventListener("mouseenter", function (evt) {
                
            }, false);

            el.addEventListener("mouseover", function (evt: MouseEvent) {
                checkCursor(el, evt);
            }, false);

            // tag notes to prevent future listener attachment
            el.setAttribute("listenersAttached", 'true');
        }
    });
}

function handleDragging(evt: MouseEvent) {
    if (dragging) {
        var pos = getMousePos(canvas, evt);

        var parsedX = parseInt(note.x, 10);
        var parsedY = parseInt(note.y, 10);

        note.x = Math.floor(parsedX - (dragPoint.x - pos.x)) + "px";
        note.y = Math.floor(parsedY - (dragPoint.y - pos.y)) + "px";

        if (parseInt(note.x) < 12) note.x = "12px";
        if (parseInt(note.y) < 12) note.y = "12px";
        //                 canvas size           padding
        if (parseInt(note.x) > 1200 - note.width - 12) note.x = Math.floor(1200 - note.width - 12) + "px"; //875
        if (parseInt(note.y) > 1200 - note.height - 12) note.y = Math.floor(1200 - note.height - 12) + "px"; //973

        dragPoint = { x: pos.x, y: pos.y };

        this.setAttribute("note", JSON.stringify(note));

        // dragging the text field along with canvas
        if (document.querySelectorAll('[class^=' + this.id + ']').length > 1) {
            moveText(this.id, note.x, note.y);
            insertAfter(document.getElementById(this.id + "Text"), this);
        }
    }
    else if (resizing) {
        var pos = getMousePos(canvas, evt);

        note.width = Math.floor(note.width - (resizePoint.x - pos.x));
        note.height = Math.floor(note.height - (resizePoint.y - pos.y));

        if (note.width < 36) note.width = 36;
        if (note.height < 16) note.height = 16;
        if (note.width > 388) note.width = 388;
        if (note.height > 388) note.height = 388;

        resizePoint = { x: pos.x, y: pos.y };

        //this.width = note.width;
        //this.height = note.height;
        this.remove();
        createCanvas(evt, note.width, note.height, note.x, note.y);
        this.setAttribute("note", JSON.stringify(note));

        if (document.querySelectorAll('[class^=' + this.id + ']').length > 1) {
            if (document.getElementById(this.id + "Text") != null) {
                resizeText(this.id, note.width - 4 + "px", note.height - 4 + "px");
                insertAfter(document.getElementById(this.id + "Text"), this);
            }
        }

    }
    else {
        checkCursor(this, evt);
    }
}

const divObserver = new MutationObserver(divCallback);
divObserver.observe(div, divObservations);

function debug(evt) {
    console.log(evt.target.x, evt.target.y);
}