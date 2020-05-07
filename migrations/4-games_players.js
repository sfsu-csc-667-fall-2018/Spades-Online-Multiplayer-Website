'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'games_players', 
      {
        game_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: {
            model: 'games',
            key: 'game_id'
          }
        },
        player_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'player',
            key: 'id'
          }  
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
