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

const strategy3 = function() {
    // test move to corner
    let nearest = myQueenNearestCanBuildInitialSideSite();
    if (MyBarracks.length === 2) {
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

const strategy4 = function() {
    let nearest = myQueenNearestCanBuildInitialSideSite();
    if (MyBarracks.length < 2) {
        print('BUILD' + ' ' + nearest.siteId + ' ' + 'BARRACKS-KNIGHT');
    } else if (EnemyKnights.length <= 4) {
        print('BUILD' + ' ' + nearest.siteId + ' ' + 'TOWER');
    } else {
        let nearestInitialCorner = initialMyQueenNearestCorner();
        print('MOVE' + ' ' + nearestInitialCorner[0] + ' ' + nearestInitialCorner[1]);
    }

    let trainString = 'TRAIN';
    if ((Gold >= KnightTrainPrice & MyBarracks.length === 1) | (Gold >= KnightTrainPrice * 2)) {
        for (let b of MyBarracks) {
            trainString += ' ' + b.siteId;
        }
    }
    print(trainString);
};


