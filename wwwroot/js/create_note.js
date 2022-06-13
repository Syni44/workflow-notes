var parentDiv = document.getElementById("d-main");
var canvas = document.getElementById("flowCanvas");
var context = canvas.getContext("2d");
canvas.addEventListener("contextmenu", function (evt) {
    evt.preventDefault();
    if (evt.button === 2) {
        // get distance from right and bottom edges of flow canvas
        // if distance is < certain value, don't make a note
        createCanvas(evt);
    }
    return false;
}, false);
function createCanvas(evt) {
    var pos = getMousePos(canvas, evt);
    var note = {
        x: Math.floor(pos.x) + "px", y: Math.floor(pos.y) + "px", width: 316, height: 218, lineHeight: 22,
        xWidth: 30, xHeight: 30, xMargins: 6,
        rWidth: 28, rHeight: 28, rMargins: 4,
        shadowRoomX: 16, shadowRoomY: 16, shadowOffsetX: 9, shadowOffsetY: 7
    };
    // "index card" line pattern
    var pattern = document.createElement("canvas");
    var patternCtx = pattern.getContext("2d");
    pattern.width = note.width;
    pattern.height = note.lineHeight;
    patternCtx.fillStyle = "#eee";
    patternCtx.fillRect(0, 0, pattern.width, pattern.height);
    patternCtx.beginPath();
    patternCtx.lineWidth = 1;
    patternCtx.strokeStyle = "#79798d";
    patternCtx.moveTo(6, note.lineHeight);
    patternCtx.lineTo(pattern.width - 6, note.lineHeight);
    patternCtx.stroke();
    // secondary X corner pattern
    var xPattern = document.createElement("canvas");
    var xCtx = xPattern.getContext("2d");
    xPattern.width = note.xWidth;
    xPattern.height = note.xHeight;
    var grd = xCtx.createLinearGradient(0, 0, 0, xPattern.height);
    grd.addColorStop(0.1, "#eeed82");
    grd.addColorStop(0.9, "#eee");
    xCtx.fillStyle = grd;
    xCtx.fillRect(0, 0, xPattern.width, xPattern.height);
    xCtx.beginPath();
    xCtx.lineWidth = 2;
    xCtx.strokeStyle = "#79798d";
    xCtx.moveTo(note.xMargins, note.xMargins);
    xCtx.lineTo(xPattern.width - note.xMargins, xPattern.height - note.xMargins);
    xCtx.moveTo(note.xMargins, xPattern.height - note.xMargins);
    xCtx.lineTo(xPattern.width - note.xMargins, note.xMargins);
    xCtx.stroke();
    // tertiary resize pattern
    var rPattern = document.createElement("canvas");
    var rCtx = rPattern.getContext("2d");
    rPattern.width = note.rWidth;
    rPattern.height = note.rHeight;
    rCtx.fillStyle = "#eee";
    rCtx.fillRect(0, 0, rPattern.width, rPattern.height);
    rCtx.beginPath();
    rCtx.strokeStyle = "#79798d";
    rCtx.moveTo(10, rPattern.height - note.rMargins);
    rCtx.lineTo(rPattern.width - note.rMargins, 10);
    rCtx.moveTo(15, rPattern.height - note.rMargins);
    rCtx.lineTo(rPattern.width - note.rMargins, 15);
    rCtx.moveTo(20, rPattern.height - note.rMargins);
    rCtx.lineTo(rPattern.width - note.rMargins, 20);
    rCtx.stroke();
    // instantiating parent canvas
    var el = document.createElement("canvas");
    var elCtx = el.getContext("2d");
    var compositeOperation = elCtx.globalCompositeOperation;
    var noteNum = parentDiv.childElementCount;
    while (document.querySelectorAll('[id^=note' + noteNum + ']').length > 0) {
        noteNum -= 1;
    }
    el.style.zIndex = "2";
    el.style.cursor = "auto";
    el.id = "note" + noteNum.toString();
    el.width = note.width + note.shadowRoomX;
    el.height = note.height + note.shadowRoomY;
    // shadows
    elCtx.shadowOffsetX = note.shadowOffsetX;
    elCtx.shadowOffsetY = note.shadowOffsetY;
    elCtx.shadowColor = "black";
    elCtx.shadowBlur = 6;
    elCtx.fillStyle = "#eee";
    elCtx.globalAlpha = 0.5;
    elCtx.fillRect(0, 0, el.width - note.shadowRoomX, el.height - note.shadowRoomY);
    // reset shadows
    elCtx.shadowOffsetX = 0;
    elCtx.shadowOffsetY = 0;
    elCtx.shadowBlur = 0;
    elCtx.globalAlpha = 1;
    elCtx.fillRect(0, 0, el.width - note.shadowRoomX, el.height - note.shadowRoomY);
    // fill with first pattern
    var elPattern = elCtx.createPattern(pattern, "repeat-y");
    elCtx.fillStyle = elPattern;
    elCtx.fillRect(0, note.lineHeight, el.width - note.shadowRoomX, el.height - note.lineHeight - note.shadowRoomY);
    // fill with second pattern
    var elXPattern = elCtx.drawImage(xPattern, el.width - note.xWidth - note.shadowRoomX, 0);
    // fill with tertiary pattern
    var elRPattern = elCtx.drawImage(rPattern, el.width - note.rWidth - note.shadowRoomX, el.height - note.rHeight - note.shadowRoomY);
    // reposition canvas to mouse location
    el.style.left = note.x;
    el.style.top = note.y;
    el.className = el.id;
    el.setAttribute("note", JSON.stringify(note));
    el.setAttribute("listenersAttached", 'false');
    canvas.parentNode.insertBefore(el, canvas);
    return { note: note, el: el };
}
//# sourceMappingURL=create_note.js.map