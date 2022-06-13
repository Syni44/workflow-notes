﻿const div = document.getElementById("d-main") as HTMLDivElement;
const divObservations = { childList: true };
var note: Note;
var dragPoint = { x: 0, y: 0 };
let dragging: boolean = false;

const divCallback = function (mutationList, observer) {
    // click and drag: mouse up
    mutationList[0].target.addEventListener("mouseup", () => dragging = false);

    // todo: most events in here need to include manipulating the text area
    // field associated with the parent canvas
    // already done: dragging functionality
    //
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

                    // left click on note functionality
                    // drag and drop, close note, resize note
                    if (evt.button === 0 && evt.detail == 1 && (el as HTMLElement).style.cursor == "auto") {
                        var pos = getMousePos(el, evt);

                        // handling close note via clicking on X region
                        if (pos.x > note.width - note.xWidth
                            && pos.x < note.width
                            && pos.y < note.xHeight) {
                            el.remove();
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
                        createTextArea(el, evt);
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
        if (parseInt(note.x) > 875) note.x = "875px";
        if (parseInt(note.y) > 973) note.y = "973px";

        dragPoint = { x: pos.x, y: pos.y };

        this.setAttribute("note", JSON.stringify(note));

        // support dragging functionality
        if (document.querySelectorAll('[class^=' + this.id + ']').length > 1) {
            moveText(this.id, note.x, note.y);
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