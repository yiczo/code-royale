class Util {
    constructor() {

    }

    static space() {
        return ' ';
    }

    static newLine() {
        return '\n';
    }

    static log(...args) {
        printErr(...args);
    }
}

class UnitOwner {
    constructor() {

    }

    static log(type) {
        let o = {
            '0': 'Friendly',
            '1': 'Enemy',
        };
        return o[type];
    }

    static Friendly() {
        return 0;
    }

    static Enemy() {
        return 1;
    }
}

class UnitType {
    constructor() {

    }

    static log(type) {
        let o = {
            '-1': 'Queen',
            '0': 'Knight',
            '1': 'Archer',
            '2': 'Giant',
        };
        return o[type];
    }

    static Queen() {
        return -1;
    }

    static Knight() {
        return 0;
    }

    static Archer() {
        return 1;
    }

    static Giant() {
        return 2;
    }
}

class Unit {
    constructor(x, y, owner, unitType, health) {
        this.x = x;
        this.y = y;
        this.owner = owner;
        this.unitType = unitType;
        this.health = health;
    }

    isMine() {
        return (this.owner === UnitOwner.Friendly());
    }

    isQueen() {
        return (this.unitType === UnitType.Queen());
    }

    isKnight() {
        return (this.unitType === UnitType.Knight());
    }

    isArcher() {
        return (this.unitType === UnitType.Archer());
    }

    isGiant() {
        return (this.unitType == UnitType.Giant());
    }

    log() {
        Util.log('This is a Unit' + Util.space() + UnitType.log(this.unitType));
        Util.log('x' + Util.space() + this.x);
        Util.log('y' + Util.space() + this.y);
        Util.log('owner' + Util.space() + UnitOwner.log(this.owner));
        Util.log('unit type' + Util.space() + UnitType.log(this.unitType));
        Util.log('health' + Util.space() + this.health);
        Util.log(Util.newLine());
    }
}

class SiteStructureType {
    constructor() {

    }

    static log(type) {
        let o = {
            '-1': 'No Structure',
            '1': 'Tower',
            '2': 'Barracks',
        };
        return o[type];
    }

    static NoStructure() {
        return -1;
    }

    static Tower() {
        return 1;
    }

    static Barracks() {
        return 2;
    }
}

class SiteOwner {
    constructor() {

    }

    static log(type) {
        let o = {
            '-1': 'No Structure',
            '0': 'Friendly',
            '1': 'Enemy',
        };
        return o[type];
    }

    static NoStructure() {
        return -1;
    }

    static Friendly() {
        return 0;
    }

    static Enemy() {
        return 1;
    }
}

class Site {
    constructor(siteId, x, y, radius) {
        this.siteId = siteId;
        this.x = x;
        this.y = y;
        this.radius = radius;

        this.structureType = -1;
        this.owner = -1;
    }

    log() {
        Util.log('This is a Site');
        Util.log('siteId' + Util.space() + this.siteId);
        Util.log('x' + Util.space() + this.x);
        Util.log('y' + Util.space() + this.y);
        Util.log('radius' + Util.space() + this.radius);
        Util.log('structure type' + Util.space() + SiteStructureType.log(this.structureType));
        Util.log('owner' + Util.space() + SiteOwner.log(this.owner));
        Util.log(Util.newLine());
    }

    canBuild() {
        if (this.structureType === SiteStructureType.NoStructure()) {
            if (this.owner == SiteOwner.NoStructure()) {
                return true;
            }
        }
        return false;
    }

    distanceTo(x, y) {
        let deltaX = this.x - x;
        let deltaY = this.y - y;
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }
}

class General {
    constructor() {
        this.sites = {};

        this.gold = 0;
        this.touchedSiteId = -1;

        this.queen = null;
        this.knights = [];
        this.archers = [];
        this.giants = [];

        this.enemyQueen = null;
        this.enemyKnights = [];
        this.enemyArchers = [];
        this.enemyGiants = [];
    }

    static instance(...args) {
        this.i = this.i || new General(...args);
        return this.i;
    }

    addSite(site) {
        this.sites[site.siteId] = site;
    }

    updateSite(siteId, structureType, owner) {
        let site = this.sites[siteId];
        site.structureType = structureType;
        site.owner = owner;
    }

    logSites() {
        let keys = Object.keys(this.sites);
        Util.log('Num of sites' + Util.space() + keys.length + Util.newLine());
        for (let k of keys) {
            let site = this.sites[k];
            site.log();
        }
    }

    clearUnitsStatus() {
        this.queen = null;
        this.knights = [];
        this.archers = [];
        this.giants = [];

        this.enemyQueen = null;
        this.enemyKnights = [];
        this.enemyArchers = [];
        this.enemyGiants = [];
    }

    updateUnit(unit) {
        if (unit.isMine()) {
            if (unit.isQueen()) {
                this.queen = unit;
            } else if (unit.isKnight()) {
                this.knights.push(unit);
            } else if (unit.isArcher()) {
                this.archers.push(unit);
            } else if (unit.isGiant()) {
                this.giants.push(unit);
            }
        } else {
            if (unit.isQueen()) {
                this.enemyQueen = unit;
            } else if (unit.isKnight()) {
                this.enemyKnights.push(unit);
            } else if (unit.isArcher()) {
                this.enemyArchers.push(unit);
            } else if (unit.isGiant()) {
                this.enemyGiants.push(unit);
            }
        }
    }

    logOneTypeUnits(unitArray, titleString) {
        Util.log('Num of ' + titleString + Util.space() + unitArray.length + Util.newLine());
        for (let u of unitArray) {
            u.log();
        }
    }

    logUnits() {
        this.queen.log();
        this.logOneTypeUnits(this.knights, 'My Knights');
        this.logOneTypeUnits(this.archers, 'My Archers');
        this.logOneTypeUnits(this.giants, 'My Giants');

        this.enemyQueen.log();
        this.logOneTypeUnits(this.enemyKnights, 'Enemy Knights');
        this.logOneTypeUnits(this.enemyArchers, 'Enemy Archers');
        this.logOneTypeUnits(this.enemyGiants, 'Enemy Giants');
    }
}

class StrategyManager {
    constructor() {
        
    }

    static instance(...args) {
        this.i = this.i || new StrategyManager(...args);
        return this.i;
    }

    update(general) {

    }
}

var numSites = parseInt(readline());
for (var i = 0; i < numSites; i++) {
    var inputs = readline().split(' ');
    var siteId = parseInt(inputs[0]);
    var x = parseInt(inputs[1]);
    var y = parseInt(inputs[2]);
    var radius = parseInt(inputs[3]);

    let site = new Site(siteId, x, y, radius);
    General.instance().addSite(site);
}

while (true) {
    var inputs = readline().split(' ');
    var gold = parseInt(inputs[0]);
    var touchedSite = parseInt(inputs[1]); // -1 if none

    General.instance().gold = gold;
    General.instance().touchedSiteId = touchedSite;

    for (var i = 0; i < numSites; i++) {
        var inputs = readline().split(' ');
        var siteId = parseInt(inputs[0]);
        var ignore1 = parseInt(inputs[1]); // used in future leagues
        var ignore2 = parseInt(inputs[2]); // used in future leagues
        var structureType = parseInt(inputs[3]); // -1 = No structure, 1 = Tower, 2 = Barracks
        var owner = parseInt(inputs[4]); // -1 = No structure, 0 = Friendly, 1 = Enemy
        var param1 = parseInt(inputs[5]);
        var param2 = parseInt(inputs[6]);

        General.instance().updateSite(siteId, structureType, owner);
    }

    // General.instance().logSites();

    General.instance().clearUnitsStatus();

    var numUnits = parseInt(readline());
    for (var i = 0; i < numUnits; i++) {
        var inputs = readline().split(' ');
        var x = parseInt(inputs[0]);
        var y = parseInt(inputs[1]);
        var owner = parseInt(inputs[2]);
        var unitType = parseInt(inputs[3]); // -1 = QUEEN, 0 = KNIGHT, 1 = ARCHER, 2 = GIANT
        var health = parseInt(inputs[4]);

        let unit = new Unit(x, y, owner, unitType, health);
        General.instance().updateUnit(unit);
    }

    // General.instance().logUnits();

    StrategyManager.instance().update(General.instance());

    // First line: A valid queen action
    // Second line: A set of training instructions
    print('WAIT');
    print('TRAIN');
}
