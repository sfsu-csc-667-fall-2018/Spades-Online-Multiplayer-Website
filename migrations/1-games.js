'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'games', 
      {
        game_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        game_name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        scores_id: {
          type: Sequelize.INTEGER 
        },
        num_players: {
          type: Sequelize.INTEGER,
          allowNull: false  
        }
      }
    ); 
  },    
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('decks');
  }
};
