function openMenu(element, evt) {
    var pos = getMousePos(element, evt);
    var cMenu = document.createElement("canvas");
    var ctx = cMenu.getContext("2d");
    cMenu.addEventListener("contextmenu", function (e) { return e.preventDefault(); });
    cMenu.id = "contextSubMenu";
    cMenu.width = 128;
    cMenu.height = 88;
    // reference for mouseover highlighting
    //ctx.fillStyle = "#79798d";
    //ctx.fillRect(0, 0, cMenu.width, cMenu.height / 2);
    ctx.fillStyle = "#46465a";
    ctx.fillRect(0, 0, cMenu.width, cMenu.height);
    ctx.font = "28px Calibri";
    ctx.fillStyle = "#eee";
    ctx.fillText('Edit', 10, 32);
    ctx.fillText('Add Link', 10, 72);
    cMenu.style.zIndex = "3";
    cMenu.style.border = "solid";
    cMenu.style.borderWidth = "1px";
    cMenu.style.borderColor = "#eee";
    cMenu.style.borderRadius = "8px";
    cMenu.style.left = Math.floor(getMousePos(canvas, evt).x) + "px";
    cMenu.style.top = Math.floor(getMousePos(canvas, evt).y) + "px";
    element.parentNode.insertBefore(cMenu, element);
}
//# sourceMappingURL=open_contextmenu.js.map