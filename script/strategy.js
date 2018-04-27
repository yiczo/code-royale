const strategy1 = function() {
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
