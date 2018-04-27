const strategy1 = function() {
    // 8 knights rush together, build towers in initial side
    let nearest = myQueenNearestCanBuildInitialSideSite();
    if (nearest === null) {
        print('WAIT');
    } else {
        if (MyBarracks.length < 2) {
            print('BUILD' + ' ' + nearest.siteId + ' ' + 'BARRACKS-KNIGHT');
        } else {
            print('BUILD' + ' ' + nearest.siteId + ' ' + 'TOWER');
        }
    }

    let trainString = 'TRAIN';
    if (Gold >= KnightTrainPrice * 2) {
        for (let b of MyBarracks) {
            trainString += ' ' + b.siteId;
        }
    }
    print(trainString);
};

const strategy2 = function() {
    // 8 knights rush together, build towers in initial side, 
    // if nothing can build, return to initial nearest corner
    let nearest = myQueenNearestCanBuildInitialSideSite();
    if (nearest === null) {
        let nearestInitialCorner = initialMyQueenNearestCorner();
        print('MOVE' + ' ' + nearestInitialCorner[0] + ' ' + nearestInitialCorner[1]);
    } else {
        if (MyBarracks.length < 2) {
            print('BUILD' + ' ' + nearest.siteId + ' ' + 'BARRACKS-KNIGHT');
        } else {
            print('BUILD' + ' ' + nearest.siteId + ' ' + 'TOWER');
        }
    }

    let trainString = 'TRAIN';
    if ((Gold >= KnightTrainPrice & MyBarracks.length === 1) | (Gold >= KnightTrainPrice * 2)) {
        for (let b of MyBarracks) {
            trainString += ' ' + b.siteId;
        }
    }
    print(trainString);
};
