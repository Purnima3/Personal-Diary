'use strict';
const {DataTypes} = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable('roles', {  roleid:{
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
  }, });
     
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.dropTable('role');
     
  }
};
