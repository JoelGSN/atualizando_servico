import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const cad_cliente = sequelize.define('cliente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    cpfoucnpj: {
        type: DataTypes.STRING(20), 
        allowNull: false
    },
    rua: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    uf: {
        type: DataTypes.STRING(2), 
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'clientes'
})

export default cad_cliente
