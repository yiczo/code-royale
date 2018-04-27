let initialMyQueenX = -1;
let initialMyQueenY = -1;

const setInitialMyQueenPosition = function(queen) {
    if (queen === null) {
        return;
    }

    if (initialMyQueenX === -1 & initialMyQueenY === -1) {
        initialMyQueenX = queen.x;
        initialMyQueenY = queen.y;
    }
};

const myQueenNearestCanBuildInitialSideSite = function() {
    let sitesInMySide = sitesInSide(initialMyQueenSide(MyQueen));

    let resultSite = null;
    let nearestDistance = FieldDiagonal;

    for (let s of sitesInMySide) {
        if (s.canBuild()) {
            let d = s.distanceTo(MyQueen.x, MyQueen.y)
            if (d <= nearestDistance) {
                nearestDistance = d;
                resultSite = s;
            }
        }
    }

    return resultSite;
}
