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
