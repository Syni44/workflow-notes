const noteObservations = { attributes: true };

interface Note {
    x: string;
    y: string;
    width: number;
    height: number;

    lineHeight: number;

    xWidth: number;
    xHeight: number;
    xMargins: number;

    rWidth: number;
    rHeight: number;
    rMargins: number;

    readonly shadowRoomX: number;
    readonly shadowRoomY: number;
    readonly shadowOffsetX: number;
    readonly shadowOffsetY: number;
}

const noteCallback = function (mutationList, observer) {
    const unwrap: Note = JSON.parse(mutationList[0].target.getAttribute("note")) as Note;

    console.log(mutationList[0].target.id, unwrap.x, unwrap.y, unwrap.width, unwrap.height);
    mutationList[0].target.style.left = unwrap.x;
    mutationList[0].target.style.top = unwrap.y;
    mutationList[0].target.style.width = unwrap.width;
    mutationList[0].target.style.height = unwrap.height;
}