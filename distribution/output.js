let Gold = 0;

let KnightTrainPrice = 80;


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

const SiteStructureType = {
    'NoStructure': -1,
    'Tower': 1,
    'Barracks': 2,
};

const SiteOwner = {
    'NoStructure': -1,
    'Friendly': 0,
    'Enemy': 1,
};

let Sites = {};
let TouchedSiteId = -1;

class Site {
    constructor(siteId, x, y, radius, structureType, owner) {
        this.siteId = siteId;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.structureType = structureType;
        this.owner = owner;
    }

    distanceTo(x, y) {
        return Math.sqrt( (this.x - x) * (this.x - x) + (this.y - y) * (this.y - y) );
    }

    canBuild() {
        return (this.structureType === SiteStructureType.NoStructure) & (this.owner === SiteOwner.NoStructure);
    }
}

const addSite = function(site) {
    Sites[site.siteId] = site;
};

const updateSite = function(siteId, structureType, owner) {
    let site = Sites[siteId];
    site.structureType = structureType;
    site.owner = owner;

    if (isTower(site)) {
        addTowerFromSite(site);
    }

    if (isBarrack(site)) {
        addBarrackFromSite(site);
    }
};

const clearKindsOfSiteStatus = function() {
    MyTowers = [];
    EnemyTowers = [];
    MyKnightBarracks = [];
    MyArcherBarracks = [];
    MyGiantBarracks = [];

    EnemyKnightBarracks = [];
    EnemyArcherBarracks = [];
    EnemyGiantBarracks = [];

    MyBarracks = [];
    EnemyBarracks = [];
};

const BarrackType = {
    'Knight': 'Knight',
    'Archer': 'Archer',
    'Giant': 'Giant',
};

let MyKnightBarracks = [];
let MyArcherBarracks = [];
let MyGiantBarracks = [];

let EnemyKnightBarracks = [];
let EnemyArcherBarracks = [];
let EnemyGiantBarracks = [];

let MyBarracks = [];
let EnemyBarracks = [];

const isBarrack = function(site) {
    return site.structureType === SiteStructureType.Barracks;
};

const addBarrackFromSite = function(site) {
    let barrack = new Barrack(site.siteId, site.x, site.y, site.radius);
    if (site.owner === SiteOwner.Friendly) {
        MyBarracks.push(barrack);
    } else if (site.owner === SiteOwner.Enemy) {
        EnemyBarracks.push(barrack);   
    }
};

class Barrack {
    constructor(siteId, x, y, radius) {
        this.siteId = siteId;
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
}

const FieldWidth = 1920;
const FieldHeight = 1000;

const MagicSideDivideExtra = 0.1 * FieldWidth;

const FieldSide = {
    'Left': 'LeftSide',
    'Right': 'RightSide',
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

let MyTowers = [];
let EnemyTowers = [];

const isTower = function(site) {
    return site.structureType === SiteStructureType.Tower;
};

const addTowerFromSite = function(site) {
    let tower = new Tower(site.siteId, site.x, site.y, site.radius);
    if (site.owner === SiteOwner.Friendly) {
        MyTowers.push(tower);
    } else if (site.owner === SiteOwner.Enemy) {
        EnemyTowers.push(tower);
    }
};

class Tower {
    constructor(siteId, x, y, radius) {
        this.siteId = siteId;
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
}

let Units = [];

let MyQueen = null;
let MyKnights = [];
let MyArchers = [];
let MyGiants = [];

let EnemyQueen = null;
let EnemyKnights = [];
let EnemyArchers = [];
let EnemyGiants = [];

const addUnit = function(unit) {
    Units.push(unit);

    if (unit.owner === UnitOwner.Friendly) {
        if (unit.unitType === UnitType.Queen) {
            MyQueen = unit;
            // remember initial my queen position
            setInitialMyQueenPosition(unit);
        } else if (unit.unitType === UnitType.Knight) {
            MyKnights.push(unit);
        } else if (unit.unitType === UnitType.Archer) {
            MyArchers.push(unit);
        } else if (unit.unitType === UnitType.Giant) {
            MyGiants.push(unit);
        }
    } else if (unit.owner === UnitOwner.Enemy) {
        if (unit.unitType === UnitType.Queen) {
            EnemyQueen = unit;
        } else if (unit.unitType === UnitType.Knight) {
            EnemyKnights.push(unit);
        } else if (unit.unitType === UnitType.Archer) {
            EnemyArchers.push(unit);
        } else if (unit.unitType === UnitType.Giant) {
            EnemyGiants.push(unit);
        }
    }
};

const UnitType = {
    'Queen': -1,
    'Knight': 0,
    'Archer': 1,
    'Giant': 2,
};

const UnitOwner = {
    'Friendly': 0,
    'Enemy': 1,
};

class Unit {
    constructor(x, y, owner, unitType, health) {
        this.x = x;
        this.y = y;
        this.owner = owner;
        this.unitType = unitType;
        this.health = health;
    }
}

const clearKindsOfUnitStatus = function() {
    Units = [];

    MyQueen = null;
    MyKnights = [];
    MyArchers = [];
    MyGiants = [];

    EnemyQueen = null;
    EnemyKnights = [];
    EnemyArchers = [];
    EnemyGiants = [];
};


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

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var numSites = parseInt(readline());
for (var i = 0; i < numSites; i++) {
    var inputs = readline().split(' ');
    var siteId = parseInt(inputs[0]);
    var x = parseInt(inputs[1]);
    var y = parseInt(inputs[2]);
    var radius = parseInt(inputs[3]);

    let site = new Site(siteId, x, y, radius, SiteStructureType.NoStructure, SiteOwner.NoStructure);
    addSite(site);
}

// printErr(Object.keys(Sites));

// game loop
while (true) {
    clearKindsOfSiteStatus();

    var inputs = readline().split(' ');
    var gold = parseInt(inputs[0]);
    Gold = gold;

    var touchedSite = parseInt(inputs[1]); // -1 if none
    TouchedSiteId = touchedSite;

    for (var i = 0; i < numSites; i++) {
        var inputs = readline().split(' ');
        var siteId = parseInt(inputs[0]);
        var ignore1 = parseInt(inputs[1]); // used in future leagues
        var ignore2 = parseInt(inputs[2]); // used in future leagues
        var structureType = parseInt(inputs[3]); // -1 = No structure, 1 = Tower, 2 = Barracks
        var owner = parseInt(inputs[4]); // -1 = No structure, 0 = Friendly, 1 = Enemy
        var param1 = parseInt(inputs[5]);
        var param2 = parseInt(inputs[6]);

        updateSite(siteId, structureType, owner);
    }

    // for (let k of Object.keys(Sites)) {
    //     let s = Sites[k];
    //     if (s.owner === SiteOwner.Enemy) {
    //         printErr('enemy');
    //     }
    // }

    // for (let b of EnemyBarracks) {
    //     printErr(b);
    // }

    clearKindsOfUnitStatus();

    var numUnits = parseInt(readline());
    for (var i = 0; i < numUnits; i++) {
        var inputs = readline().split(' ');
        var x = parseInt(inputs[0]);
        var y = parseInt(inputs[1]);
        var owner = parseInt(inputs[2]);
        var unitType = parseInt(inputs[3]); // -1 = QUEEN, 0 = KNIGHT, 1 = ARCHER, 2 = GIANT
        var health = parseInt(inputs[4]);

        let unit = new Unit(x, y, owner, unitType, health);
        addUnit(unit);
    }

    // printErr(EnemyKnights.length);

    // Write an action using print()
    // To debug: printErr('Debug messages...');

    // First line: A valid queen action
    // Second line: A set of training instructions
    // print('WAIT');
    // print('TRAIN');

    strategy1();
}
