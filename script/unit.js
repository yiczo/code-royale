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

