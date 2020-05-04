const gameSocket = io();

let numPlayers;
let leftPlayerOrder, topPlayerOrder, rightPlayerOrder, bottomPlayerOrder;
let leftPlayer, topPlayer, rightPlayer, bottomPlayer;
let playerNames;
let playersCards;
let currentPlayer;
let turnState;
let observer;
let selectedSingle = false;
let selectedSingleCard = "0";
let gameOver = false;
