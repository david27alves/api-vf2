const { Sequelize} = require('sequelize')
const db = require('./db')

const Portariasnfe = Sequelize.define({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    chave: {
        type: Sequelize.STRING,
        allowNull: false
    },
    id_portaria: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }

})