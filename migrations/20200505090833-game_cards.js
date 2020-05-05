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
          type: Sequelize.INTEGER,
          references: { model: 'player', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
        card_id: {
          type: Sequelize.INTEGER,
          references: { model: 'cards', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
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