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
    let sites = sitesInSide(initialMyQueenSide(MyQueen));

    let resultSite = null;
    let nearestDistance = FieldWidth;

    for (let s of sites) {
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
