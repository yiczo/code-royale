const FieldWidth = 1920;
const FieldHeight = 1000;
const FieldDiagonal = Math.sqrt(1920 * 1920 + 1000 * 1000);

const MagicSideDivideExtra = 0.1 * FieldWidth;

const FieldSide = {
    'Left': 'LeftSide',
    'Right': 'RightSide',
};

const initialMyQueenNearestCorner = function() {
    let corners = [
        [0, 0],
        [FieldWidth, 0],
        [0, FieldHeight],
        [FieldWidth, FieldHeight],
    ];

    let resultCorner = [0, 0];
    let nearestDistance = FieldDiagonal;
    for (let c of corners) {
        let distance = Math.sqrt( (initialMyQueenX - c[0]) * (initialMyQueenX - c[0]) + (initialMyQueenY - c[1]) * (initialMyQueenY - c[1]) );
        if (distance <= nearestDistance) {
            nearestDistance = distance;
            resultCorner = c;
        }
    }

    return resultCorner;
};

const initialMyQueenSide = function(queen) {
    if (queen.x <= FieldWidth * 0.5) {
        return FieldSide.Left;
    } else {
        return FieldSide.Right;
    }
};

const rangeForSide = function(side) {
    if (side === FieldSide.Left) {
        return [0, MagicSideDivideExtra + FieldWidth * 0.5];
    } else {
        return [FieldWidth * 0.5 - MagicSideDivideExtra, FieldWidth];
    }
};

const sitesInSide = function(side) {
    let resultSites = [];
    let range = rangeForSide(side);
    let keys = Object.keys(Sites);
    for (let key of keys) {
        let site = Sites[key];
        if (site.x >= range[0] & site.x <= range[1]) {
            resultSites.push(site);
        }
    }
    return resultSites;
}
