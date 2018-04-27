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

    strategy4();
}
