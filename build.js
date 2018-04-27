const buildify = require('buildify')

buildify()
    .concat(['script/1.js', 'script/2.js'])
    .save('distribution/output.js')
    