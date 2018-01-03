const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const User = require('../models/User');
const encryption = require('../util/encryption');

function seedAdmin() {
    return new Promise((resolve, reject) => {
        User.find({username: 'admin'}).then(users => {
            if (users.length === 0) {
                let pwd = 'admin12';
                let salt = encryption.generateSalt();
                let hashedPwd = encryption.generateHashedPassword(salt, pwd);

                let adminData = {
                    username: 'admin',
                    firstName: 'Ivaka',
                    lastName: 'Baramov',
                    salt: salt,
                    password: hashedPwd,
                    roles: ['Admin'],
                };

                User.create(adminData).then(admin => {
                    console.log(`Seeded admin: ${admin.username}`);
                    resolve(admin._id);
                });
            }
        });
    });
}


module.exports = (config) => {
    "use strict";
    mongoose.connect(config.connectionString);

    let database = mongoose.connection;
    database.once('open', (err) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log('Database connected!');
    });

    database.on('error', (err) => {
        console.log(err);
    });

    seedAdmin();
};

