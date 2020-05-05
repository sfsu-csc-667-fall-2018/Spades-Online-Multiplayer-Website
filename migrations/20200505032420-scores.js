'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'scores', 
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true    
        },
        game_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'games',
            key: 'game_id'
          }
        },
        books_a: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        books_b: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        bags_a: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        bags_b: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        bets_a: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        bets_b: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        points_a: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        points_b: {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('scores');
  }
};
