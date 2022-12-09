const {DataTypes} = require('sequelize')

const db = require('../db/conn')

const User = require('./User')

const Tasks = db.define('Tasks', {
    task: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    level: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Tasks.belongsTo(User)
User.hasMany(Tasks)

module.exports = Tasks