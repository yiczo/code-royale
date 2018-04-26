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

class Site {
    constructor(siteId, x, y, radius) {
        this.siteId = siteId;
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    log() {
        Util.log('This is a Site');
        Util.log('siteId' + Util.space() + this.siteId);
        Util.log('x' + Util.space() + this.x);
        Util.log('y' + Util.space() + this.y);
        Util.log('radius' + Util.space() + this.radius);
        Util.log(Util.newLine());
    }
}

class General {
    constructor() {
        this.sites = {}
    }

    static instance(...args) {
        this.i = this.i || new General(...args);
        return this.i;
    }

    addSite(site) {
        this.sites[site.siteId] = site;
    }

    logSites() {
        let keys = Object.keys(this.sites);
        Util.log('Num of sites' + Util.space() + keys.length + Util.newLine());
        for (let k of keys) {
            let site = this.sites[k];
            site.log();
        }
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

General.instance().logSites();

while (true) {
    var inputs = readline().split(' ');
    var gold = parseInt(inputs[0]);
    var touchedSite = parseInt(inputs[1]); // -1 if none
    for (var i = 0; i < numSites; i++) {
        var inputs = readline().split(' ');
        var siteId = parseInt(inputs[0]);
        var ignore1 = parseInt(inputs[1]); // used in future leagues
        var ignore2 = parseInt(inputs[2]); // used in future leagues
        var structureType = parseInt(inputs[3]); // -1 = No structure, 1 = Tower, 2 = Barracks
        var owner = parseInt(inputs[4]); // -1 = No structure, 0 = Friendly, 1 = Enemy
        var param1 = parseInt(inputs[5]);
        var param2 = parseInt(inputs[6]);
    }
    var numUnits = parseInt(readline());
    for (var i = 0; i < numUnits; i++) {
        var inputs = readline().split(' ');
        var x = parseInt(inputs[0]);
        var y = parseInt(inputs[1]);
        var owner = parseInt(inputs[2]);
        var unitType = parseInt(inputs[3]); // -1 = QUEEN, 0 = KNIGHT, 1 = ARCHER, 2 = GIANT
        var health = parseInt(inputs[4]);
    }

    // First line: A valid queen action
    // Second line: A set of training instructions
    print('WAIT');
    print('TRAIN');
}
