'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'decks',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        card_1: {
          type: Sequelize.INTEGER,
          primaryKey: false,
          autoIncrement: false
        },
        card_2 : { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_3 : { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_4 : { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_5 : { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_6 : { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_7 : { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_8 : { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_9 : { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_10: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_11: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_12: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_13: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_14: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_15: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_16: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_17: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_18: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_19: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_20: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_21: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_22: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_23: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_24: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_25: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_26: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_27: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_28: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_29: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_30: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_31: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_32: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_33: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_34: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_35: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_36: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_37: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_38: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_39: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_40: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_41: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_42: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_43: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_44: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_45: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_46: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_47: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_48: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_49: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_50: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_51: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
        card_52: { type: Sequelize.INTEGER, primaryKey: false, autoIncrement: false },
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('decks');
  }
};