'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'cards',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: false
        },
        suit: {
          type: Sequelize.INTEGER,
          primaryKey: false,
          autoIncrement: false
        },
        value: {
          type: Sequelize.INTEGER,
          primaryKey: false,
          autoIncrement: false
        },
        name: {
          type: Sequelize.STRING(32)
        },
        image: {
          type: Sequelize.STRING(32)
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cards');
  }
};