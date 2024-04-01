const {sequelize} = require('../db.js');
const {DataTypes} = require('sequelize')

const Role = sequelize.define('roles',{
    roleid:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull:false,
        unique:true
    },
    rolename :{
        type: DataTypes.STRING,
        unique:true,
        allowNull:false

    }, createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
      },
})



module.exports=Role