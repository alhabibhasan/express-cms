const db = require('../db');
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

const Page = db.define('Page', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: DataTypes.TEXT
});

Page.sync();

const Band = db.define('Band', {
    header: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text_content: DataTypes.TEXT,
    image_url: {
        type: DataTypes.TEXT,
        length: DataTypes.long
    }
});

Page.hasMany(Band, {as: 'PageBands'});

Band.sync();

module.exports = {
    Page,
    Band
};