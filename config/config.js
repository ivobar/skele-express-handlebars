const path = require('path');

let dbName = 'app';

module.exports = {
    development: {
        connectionString: `mongodb://localhost:27017/${dbName}`,
        rootPath: path.normalize(
            path.join(__dirname, '../../'))
    },
    production: {}
};