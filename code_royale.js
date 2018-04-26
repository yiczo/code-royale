class Util {
    constructor() {

    }

    static gameCanvasWidth() {
        return 1920;
    }

    static gameCanvasHeight() {
        return 1000;
    }

    static maxStepLength() {
        return 60;
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

    queenNearestSiteCanBuild(sites) {
        let nearestSite = null;
        let nearestDistance = Util.gameCanvasWidth();
        let keys = Object.keys(sites);
        for (let k of keys) {
            let site = sites[k];
            if (site.canBuild()) {
                let distance = site.distanceTo(this.x, this.y);
                if (distance < nearestDistance) {
                    nearestDistance = distance;
                    nearestSite = site;
                } 
            }
        }
        return nearestSite;
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

class BuildType {
    constructor() {

    }

    static Knight() {
        return 'BARRACKS-KNIGHT';
    }

    static Archer() {
        return 'BARRACKS-ARCHER';
    }

    static Giant() {
        return 'BARRACKS-GIANT';
    }

    static Tower() {
        return 'TOWER';
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

class CommandManager {
    constructor() {

    }

    static instance(...args) {
        this.i = this.i || new CommandManager(...args);
        return this.i;
    }

    executeCommand(command) {
        print(command);
    }

    // commands

    moveTowards(queen, x, y) {
        let deltaX;
        let deltaY;

        if (x === queen.x) { // avoid divide by zero
            deltaX = 0;
            deltaY = y - queen.y;
        } else {
            let tan = (y - queen.y) / (x - queen.x);
            let step = Util.maxStepLength();
            deltaX = Math.sqrt(step * step / (1 + tan * tan));
            deltaY = deltaX * tan;
        }

        if (x - queen.x > 0) {
            deltaX = Math.abs(deltaX);
        } else {
            deltaX = -Math.abs(deltaX);
        }

        if (y - queen.y > 0) {
            deltaY = Math.abs(deltaY);
        } else {
            deltaY = -Math.abs(deltaY);
        }

        let destinationX = Math.floor(queen.x + deltaX);
        let destinationY = Math.floor(queen.y + deltaY);
        return 'MOVE' + Util.space() + destinationX + Util.space() + destinationY;
    }

    build(site, type) {
        return 'BUILD' + Util.space() + site.siteId + Util.space() + type;
    }

    train(barracks) {
        if (barracks.length === 0) {
            return 'TRAIN';
        }

        let originalTrainString = 'TRAIN';
        for (let b of barracks) {
            originalTrainString += Util.space();
            originalTrainString += b.siteId;
        }
        return originalTrainString;
    }
}

class Strategy1 {
    // move to nearest no structure site
    // build knight barracks
    // train knight as much as possible
    // loop
    constructor() {
        this.general = null;
        this.destinationSite = null;
    }

    static instance(...args) {
        this.i = this.i || new Strategy1(...args);
        return this.i;
    }

    update(general) {
        this.general = general;

        if (this.tryBuildKnightBarracks()) {

        } else {
            this.tryMoveToDestinationSite();
        }

        this.tryTrainKnightsAsMoreAsPossible();
    }

    tryBuildKnightBarracks() {
        let general = this.general;
        let touchedSiteId = general.touchedSiteId;
        if (touchedSiteId != -1) {
            let touchedSite = general.sites[touchedSiteId];
            if (touchedSite.canBuild()) {
                let cm = CommandManager.instance();
                cm.executeCommand(cm.build(touchedSite, BuildType.Knight()));
                return true;
            }
        }
        return false;
    }

    // try move to nearest site, if not have, setup a new one
    tryMoveToDestinationSite() {
        if (this.destinationSite === null) {
            this.setupNewDestinationSite();
            this.moveTowardsDestinationSite();
        } else {
            if (this.destinationSite.canBuild()) {
                this.moveTowardsDestinationSite();
            } else {
                this.setupNewDestinationSite();
                this.moveTowardsDestinationSite();
            }
        }
    }

    setupNewDestinationSite() {
        let nearestCanBuildSite = this.general.queen.queenNearestSiteCanBuild(this.general.sites);
        this.destinationSite = nearestCanBuildSite;
    }

    moveTowardsDestinationSite() {
        let cm = CommandManager.instance();
        cm.executeCommand(cm.moveTowards(this.general.queen, this.destinationSite.x, this.destinationSite.y));
    }

    tryTrainKnightsAsMoreAsPossible() {
        let barracks = [];
        let estimateGold = this.general.gold;

        let keys = Object.keys(this.general.sites);
        for (let k of keys) {
            let s = this.general.sites[k];
            if (s.owner === SiteOwner.Friendly()) {
                if (s.structureType === SiteStructureType.Barracks()) {
                    if (estimateGold > 80) {
                        barracks.push(s);
                        estimateGold -= 80;
                    }
                }
            }
        }

        let cm = CommandManager.instance();
        cm.executeCommand(cm.train(barracks));
    }
}

class Strategy2 {
    // build one giant barrack and one knight barrack
    // then build tower as much as possible
    // train one gaint to destroy enemy's building firstly
    // if num of knights less than 4, train knights
    // else train archers
    constructor() {
        this.general = null;
        this.destinationSite = null;

        this.giantSiteId = -1;
        this.knightSiteId = -1;
        this.archerSiteId = -1;   
    }

    static instance(...args) {
        this.i = this.i || new Strategy2(...args);
        return this.i;
    }

    update(general) {
        this.general = general;

        if (this.tryBuildOnlyGiantBarrack()) {

        } else if (this.tryBuildOnlyKnightBarrack()) {

        } else if (this.tryBuildOnlyArcherBarrack()) {

        } else if (this.tryBuildTower()) {

        } else {
            this.tryMoveToDestinationSite();
        }

        this.tryTrain();
    }

    tryBuildOnlyGiantBarrack() {
        let general = this.general;
        let touchedSiteId = general.touchedSiteId;
        if (touchedSiteId != -1) {
            let touchedSite = general.sites[touchedSiteId];
            if (touchedSite.canBuild()) {
                if (this.giantSiteId === -1) {
                    let cm = CommandManager.instance();
                    cm.executeCommand(cm.build(touchedSite, BuildType.Giant()));
                    this.giantSiteId = touchedSiteId;
                    return true;
                }
            }
        }
        return false;
    }

    tryBuildOnlyKnightBarrack() {
        let general = this.general;
        let touchedSiteId = general.touchedSiteId;
        if (touchedSiteId != -1) {
            let touchedSite = general.sites[touchedSiteId];
            if (touchedSite.canBuild()) {
                if (this.knightSiteId === -1) {
                    let cm = CommandManager.instance();
                    cm.executeCommand(cm.build(touchedSite, BuildType.Knight()));
                    this.knightSiteId = touchedSite.siteId;
                    return true;
                }
            }
        }
        return false;
    }

    tryBuildOnlyArcherBarrack() {
        let general = this.general;
        let touchedSiteId = general.touchedSiteId;
        if (touchedSiteId != -1) {
            let touchedSite = general.sites[touchedSiteId];
            if (touchedSite.canBuild()) {
                if (this.archerSiteId === -1) {
                    let cm = CommandManager.instance();
                    cm.executeCommand(cm.build(touchedSite, BuildType.Archer()));
                    this.archerSiteId = touchedSite.siteId;
                    return true;
                }
            }
        }
        return false;
    }


    tryBuildTower() {
        let general = this.general;
        let touchedSiteId = general.touchedSiteId;
        if (touchedSiteId != -1) {
            let touchedSite = general.sites[touchedSiteId];
            if (touchedSite.canBuild()) {
                if (this.knightSiteId != -1 & this.giantSiteId != -1) {
                    let cm = CommandManager.instance();
                    cm.executeCommand(cm.build(touchedSite, BuildType.Tower()));
                    return true;
                }
            }
        }
        return false;   
    }

    tryMoveToDestinationSite() {
        if (this.destinationSite === null) {
            this.setupNewDestinationSite();
            this.moveTowardsDestinationSite();
        } else {
            if (this.destinationSite.canBuild()) {
                this.moveTowardsDestinationSite();
            } else {
                this.setupNewDestinationSite();
                this.moveTowardsDestinationSite();
            }
        }
    }

    setupNewDestinationSite() {
        let nearestCanBuildSite = this.general.queen.queenNearestSiteCanBuild(this.general.sites);
        this.destinationSite = nearestCanBuildSite;
    }

    moveTowardsDestinationSite() {
        let cm = CommandManager.instance();

        if (this.destinationSite === null) {
            cm.executeCommand(cm.moveTowards(this.general.queen, 0, 0));
        } else {
            cm.executeCommand(cm.moveTowards(this.general.queen, this.destinationSite.x, this.destinationSite.y));
        }
    }

    tryTrain() {
        if (this.general.knights.length < 4) {
            if (this.general.gold > 80 & this.knightSiteId != -1) {
                let site = this.general.sites[this.knightSiteId];
                let cm = CommandManager.instance();
                cm.executeCommand(cm.train([site]));
                return;
            }
            print('TRAIN');
            return;
        }

        // if (this.general.giants.length === 0) {
        //     if (this.general.gold >= 120 & this.giantSiteId != -1) {
        //         let site = this.general.sites[this.giantSiteId];
        //         let cm = CommandManager.instance();
        //         cm.executeCommand(cm.train([site]));
        //         return;
        //     }
        //     print('TRAIN');
        //     return;
        // }

        if (this.general.gold >= 100 & this.archerSiteId != -1) {
            let site = this.general.sites[this.archerSiteId];
            let cm = CommandManager.instance();
            cm.executeCommand(cm.train([site]));
            return;
        }
        print('TRAIN');
        return;

        // if (this.general.giants.length >= 1 & this.general.gold >= 80 & this.knightSiteId != -1) {
        //     let site = this.general.sites[this.knightSiteId];
        //     let cm = CommandManager.instance();
        //     cm.executeCommand(cm.train([site]));
        // } else if (this.general.gold > 120 & this.giantSiteId != -1) {
        //     let site = this.general.sites[this.giantSiteId];
        //     let cm = CommandManager.instance();
        //     cm.executeCommand(cm.train([site]));       
        // } else {
        //     let cm = CommandManager.instance();
        //     cm.executeCommand(cm.train([]));   
        // }
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

    Strategy2.instance().update(General.instance());

    // First line: A valid queen action
    // Second line: A set of training instructions
    // print('WAIT');
    // print('TRAIN');
}
