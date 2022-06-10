var noteObservations = { attributes: true };
var noteCallback = function (mutationList, observer) {
    var unwrap = JSON.parse(mutationList[0].target.getAttribute("note"));
    // console.log(mutationList[0].target.id, unwrap.x, unwrap.y);
    mutationList[0].target.style.left = unwrap.x;
    mutationList[0].target.style.top = unwrap.y;
};
//# sourceMappingURL=note.js.map