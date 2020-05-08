'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'games_players', 
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        game_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        player_id: {
          type: Sequelize.INTEGER,
          allowNull: false 
        },
        position: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        team: {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('games_players');
  }
};
