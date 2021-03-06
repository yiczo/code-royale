const buildify = require('./buildify/index.js')

buildify()
    .concat(
        [
            'script/gold.js',
            'script/util.js',
            'script/queen.js',
            'script/site.js',
            'script/barrack.js',
            'script/field.js',
            'script/tower.js',
            'script/unit.js',
            'script/mine.js',
            'script/strategy.js',
            'script/main.js',
        ]
    )
    .save('distribution/output.js')
    