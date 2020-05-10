'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'game_flow', 
      {
        game_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        leading_suit: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        trick_pos: {
          type: Sequelize.INTEGER,
          allowNull: false 
        },
        round_pos: {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('game_flow');
  }
};
