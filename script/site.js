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
