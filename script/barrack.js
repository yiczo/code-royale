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
