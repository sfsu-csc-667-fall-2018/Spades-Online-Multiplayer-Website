'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cards', [
        { id:  1, suit: 1, value: 1,  name: 'Ace of Spades',     image: 'spades_1.png'   },
        { id:  2, suit: 1, value: 2,  name: '2 of Spades',       image: 'spades_2.png'   },
        { id:  3, suit: 1, value: 3,  name: '3 of Spades',       image: 'spades_3.png'   },
        { id:  4, suit: 1, value: 4,  name: '4 of Spades',       image: 'spades_4.png'   },
        { id:  5, suit: 1, value: 5,  name: '5 of Spades',       image: 'spades_5.png'   },
        { id:  6, suit: 1, value: 6,  name: '6 of Spades',       image: 'spades_6.png'   },
        { id:  7, suit: 1, value: 7,  name: '7 of Spades',       image: 'spades_7.png'   },
        { id:  8, suit: 1, value: 8,  name: '8 of Spades',       image: 'spades_8.png'   },
        { id:  9, suit: 1, value: 9,  name: '9 of Spades',       image: 'spades_9.png'   },
        { id: 10, suit: 1, value: 10, name: '10 of Spades',      image: 'spades_10.png'  },
        { id: 11, suit: 1, value: 11, name: 'Jack of Spades',    image: 'spades_11.png'  },
        { id: 12, suit: 1, value: 12, name: 'Queen of Spades',   image: 'spades_12.png'  },
        { id: 13, suit: 1, value: 13, name: 'King of Spades',    image: 'spades_13.png'  },
        { id: 14, suit: 2, value: 1,  name: 'Ace of Diamonds',   image: 'diamonds_1.png' },
        { id: 15, suit: 2, value: 2,  name: '2 of Diamonds',     image: 'diamonds_2.png' },
        { id: 16, suit: 2, value: 3,  name: '3 of Diamonds',     image: 'diamonds_3.png' },
        { id: 17, suit: 2, value: 4,  name: '4 of Diamonds',     image: 'diamonds_4.png' },
        { id: 18, suit: 2, value: 5,  name: '5 of Diamonds',     image: 'diamonds_5.png' },
        { id: 19, suit: 2, value: 6,  name: '6 of Diamonds',     image: 'diamonds_6.png' },
        { id: 20, suit: 2, value: 7,  name: '7 of Diamonds',     image: 'diamonds_7.png' },
        { id: 21, suit: 2, value: 8,  name: '8 of Diamonds',     image: 'diamonds_8.png' },
        { id: 22, suit: 2, value: 9,  name: '9 of Diamonds',     image: 'diamonds_9.png' },
        { id: 23, suit: 2, value: 10, name: '10 of Diamonds',    image: 'diamonds_10.png'},
        { id: 24, suit: 2, value: 11, name: 'Jack of Diamonds',  image: 'diamonds_11.png'},
        { id: 25, suit: 2, value: 12, name: 'Queen of Diamonds', image: 'diamonds_12.png'},
        { id: 26, suit: 2, value: 13, name: 'King of Diamonds',  image: 'diamonds_13.png'},
        { id: 27, suit: 3, value: 1,  name: 'Ace of Clubs',      image: 'clubs_1.png'    },
        { id: 28, suit: 3, value: 2,  name: '2 of Clubs',        image: 'clubs_2.png'    },
        { id: 29, suit: 3, value: 3,  name: '3 of Clubs',        image: 'clubs_3.png'    },
        { id: 30, suit: 3, value: 4,  name: '4 of Clubs',        image: 'clubs_4.png'    },
        { id: 31, suit: 3, value: 5,  name: '5 of Clubs',        image: 'clubs_5.png'    },
        { id: 32, suit: 3, value: 6,  name: '6 of Clubs',        image: 'clubs_6.png'    },
        { id: 33, suit: 3, value: 7,  name: '7 of Clubs',        image: 'clubs_7.png'    },
        { id: 34, suit: 3, value: 8,  name: '8 of Clubs',        image: 'clubs_8.png'    },
        { id: 35, suit: 3, value: 9,  name: '9 of Clubs',        image: 'clubs_9.png'    },
        { id: 36, suit: 3, value: 10, name: '10 of Clubs',       image: 'clubs_10.png'   },
        { id: 37, suit: 3, value: 11, name: 'Jack of Clubs',     image: 'clubs_11.png'   },
        { id: 38, suit: 3, value: 12, name: 'Queen of Clubs',    image: 'clubs_12.png'   },
        { id: 39, suit: 3, value: 13, name: 'King of Clubs',     image: 'clubs_13.png'   },
        { id: 40, suit: 4, value: 1,  name: 'Ace of Hearts',     image: 'hearts_1.png'   },
        { id: 41, suit: 4, value: 2,  name: '2 of Hearts',       image: 'hearts_2.png'   },
        { id: 42, suit: 4, value: 3,  name: '3 of Hearts',       image: 'hearts_3.png'   },
        { id: 43, suit: 4, value: 4,  name: '4 of Hearts',       image: 'hearts_4.png'   },
        { id: 44, suit: 4, value: 5,  name: '5 of Hearts',       image: 'hearts_5.png'   },
        { id: 45, suit: 4, value: 6,  name: '6 of Hearts',       image: 'hearts_6.png'   },
        { id: 46, suit: 4, value: 7,  name: '7 of Hearts',       image: 'hearts_7.png'   },
        { id: 47, suit: 4, value: 8,  name: '8 of Hearts',       image: 'hearts_8.png'   },
        { id: 48, suit: 4, value: 9,  name: '9 of Hearts',       image: 'hearts_9.png'   },
        { id: 49, suit: 4, value: 10, name: '10 of Hearts',      image: 'hearts_10.png'  },
        { id: 50, suit: 4, value: 11, name: 'Jack of Hearts',    image: 'hearts_11.png'  },
        { id: 51, suit: 4, value: 12, name: 'Queen of Hearts',   image: 'hearts_12.png'  },
        { id: 52, suit: 4, value: 13, name: 'King of Hearts',    image: 'hearts_13.png'  }
      ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cards');
  }
};