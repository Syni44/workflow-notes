function openMenu(element: Element, evt: MouseEvent) {
    var pos = getMousePos(element, evt);
    const cMenu: HTMLCanvasElement = document.createElement("canvas");
    var ctx = cMenu.getContext("2d");

    cMenu.id = "contextSubMenu";
    cMenu.width = 128;
    cMenu.height = 88;

    cMenu.addEventListener("contextmenu", (e) => e.preventDefault());
    cMenu.addEventListener("mouseout", (e) => closeMenu(cMenu));
    cMenu.addEventListener("mouseenter", (e) => {
        ctx.fillStyle = "#46465a";
        ctx.fillRect(0, 0, cMenu.width, cMenu.height);
        ctx.fillStyle = "#79798d";
        ctx.fillRect(0, 0, cMenu.width, cMenu.height / 2);

        ctx.font = "28px Calibri";
        ctx.fillStyle = "#eee";
        ctx.fillText('Edit', 10, 32);
        ctx.fillText('Add Link', 10, 74);
    });
    cMenu.addEventListener("mousemove", (e) => {
        pos = getMousePos(cMenu, e);
        ctx.clearRect(0, 0, cMenu.width, cMenu.height);
        console.log(pos);

        if (pos.y <= (cMenu.height / 2)) {
            ctx.fillStyle = "#46465a";
            ctx.fillRect(0, 0, cMenu.width, cMenu.height);
            ctx.fillStyle = "#79798d";
            ctx.fillRect(0, 0, cMenu.width, cMenu.height / 2);
        }
        else {
            ctx.fillStyle = "#79798d";
            ctx.fillRect(0, 0, cMenu.width, cMenu.height);
            ctx.fillStyle = "#46465a";
            ctx.fillRect(0, 0, cMenu.width, cMenu.height / 2);
        }

        ctx.font = "28px Calibri";
        ctx.fillStyle = "#eee";
        ctx.fillText('Edit', 10, 32);
        ctx.fillText('Add Link', 10, 74);
    });
    cMenu.addEventListener("mousedown", (e) => {
        pos = getMousePos(cMenu, e);

        if (pos.y <= (cMenu.height / 2)) {
            closeMenu(cMenu);

            if (element.getAttribute("textAreaExists") == 'false') {
                createTextArea(element, e);
            }
            else {
                var eText = document.getElementById(element.id + "Text");
                eText.style.pointerEvents = "auto";
            }
        }
        else {
            // create new link dialog
        }
    });

    // reference for mouseover highlighting
    //ctx.fillStyle = "#79798d";
    //ctx.fillRect(0, 0, cMenu.width, cMenu.height / 2);
    //ctx.fillStyle = "#46465a";
    //ctx.fillRect(0, 0, cMenu.width, cMenu.height);

    cMenu.style.zIndex = "3";
    cMenu.style.border = "solid";
    cMenu.style.borderWidth = "1px";
    cMenu.style.borderColor = "#eee";
    cMenu.style.borderRadius = "8px";
    cMenu.style.left = Math.floor(getMousePos(canvas, evt).x - 8) + "px";
    cMenu.style.top = Math.floor(getMousePos(canvas, evt).y - 8) + "px";

    element.parentNode.insertBefore(cMenu, element);
}

function closeMenu(element: HTMLCanvasElement) {
    element.remove();
}