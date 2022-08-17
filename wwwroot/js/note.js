var noteObservations = { attributes: true };
var noteCallback = function (mutationList, observer) {
    var unwrap = JSON.parse(mutationList[0].target.getAttribute("note"));
    console.log(mutationList[0].target.id, unwrap.x, unwrap.y, unwrap.width, unwrap.height);
    mutationList[0].target.style.left = unwrap.x;
    mutationList[0].target.style.top = unwrap.y;
    mutationList[0].target.style.width = unwrap.width;
    mutationList[0].target.style.height = unwrap.height;
};
//# sourceMappingURL=note.js.map