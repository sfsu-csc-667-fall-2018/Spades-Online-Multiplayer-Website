'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'game_spectators', 
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
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('game_spectators');
  }
};
