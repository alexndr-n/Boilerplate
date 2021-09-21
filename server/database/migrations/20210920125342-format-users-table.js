'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'firstName', { transaction: t }),
        queryInterface.removeColumn('Users', 'lastName', { transaction: t }),
        queryInterface.addColumn('Users', 'first_name', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
        queryInterface.addColumn('Users', 'last_name', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
        queryInterface.addColumn('Users', 'role', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
        queryInterface.addColumn('Users', 'password', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
        queryInterface.addColumn('Users', 'password_reset_token', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
        queryInterface.addColumn('Users', 'password_reset_expires', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'first_name', { transaction: t }),
        queryInterface.removeColumn('Users', 'last_name', { transaction: t }),
        queryInterface.removeColumn('Users', 'role', { transaction: t }),
        queryInterface.removeColumn('Users', 'password', { transaction: t }),
        queryInterface.removeColumn('Users', 'password_reset_token', { transaction: t }),
        queryInterface.removeColumn('Users', 'password_reset_expires', { transaction: t }),
        queryInterface.removeColumn('Users', 'firstName', { transaction: t }),
        queryInterface.addColumn('Users', 'firstName', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
        queryInterface.addColumn('Users', 'lastName', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
      ]);
    });
  }
};
