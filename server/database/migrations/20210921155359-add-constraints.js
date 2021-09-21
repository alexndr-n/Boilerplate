'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('Users', 'first_name', {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        }, { transaction: t }),
        queryInterface.changeColumn('Users', 'last_name', {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        }, { transaction: t }),
        queryInterface.changeColumn('Users', 'email', {
          type: Sequelize.DataTypes.STRING,
          unique: true,
          allowNull: false,
          validate: {
            isEmail: {
              args: true,
              msg: "The email has an invalid format.",
            },
            notEmpty: true,
          },
        }, { transaction: t }),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('Users', 'first_name', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
        queryInterface.changeColumn('Users', 'last_name', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
        queryInterface.changeColumn('Users', 'email', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
      ]);
    });
  }
};
