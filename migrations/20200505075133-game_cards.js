'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'game_cards',
      {
        game_id: {
          type: Sequelize.INTEGER
        },
        player_id: {
          type: Sequelize.INTEGER
        },
        card_id: {
          type: Sequelize.INTEGER
        },
        card_order: {
          type: Sequelize.INTEGER       
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('game_cards');
  }
};