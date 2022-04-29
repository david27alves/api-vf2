const { Sequelize} = require('sequelize')

const sequelize = new Sequelize({
    host: '127.0.0.1',
    dialect: 'sqlite',
    storage: '../vfconferencia.db'
})

module.exports = sequelize