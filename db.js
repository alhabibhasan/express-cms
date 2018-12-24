const Sequelize = require('sequelize');
const express = require('express');
const app = express();
const database = 'express_cms';
const user = 'express';
const password = 'password';
let sequelize = {};

if (app.settings.env === 'developement') {
    sequelize = new Sequelize(database, user, password, {
        host: 'localhost',
        dialect: 'mysql',
        operatorsAliases: false,
    
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    });
} else {
    sequelize = new Sequelize(process.env.DATABASE_URL);
}

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;