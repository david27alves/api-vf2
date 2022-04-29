const { Sequelize } = require('sequelize')
const db = require('./db')

const Portarias = db.define('portarias', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_loja: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    placa: {
        type: Sequelize.STRING,
        allowNull: true
    },
    chave_nfe: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Portarias