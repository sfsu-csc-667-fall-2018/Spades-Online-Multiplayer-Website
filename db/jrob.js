const db = require('./index')

const PLAYERS_FOR_GAME =
  "SELECT id, team, username, email FROM games_players, player WHERE game_id=$1 AND player_id=player.id"

const CARDS_FOR_GAME =
  "SELECT id, card_order, suit, value, name, image FROM game_cards, cards WHERE game_id=$1 and card_id=id"

const GAME_STATE =
  "SELECT * FROM game_flow WHERE game_id=$1"

const PLAYER_STATE =
  "SELECT * FROM games_players WHERE game_id=$1 AND player_id=$2"

const PLAYER_CARDS =
  "SELECT * FROM game_cards, cards WHERE game_id=$1 AND player_id=$2 AND card_id=id AND card_order <> 0"

const IN_PLAY_CARDS =
  "SELECT * FROM game_cards, cards WHERE game_id=$1 AND card_order=0 AND card_id=id"

const CARD_INFO = "SELECT * FROM cards WHERE id=$1"

const SET_LEADING_SUIT = "UPDATE game_flow SET leading_suit=$1 WHERE game_id=$2 RETURNING *"

const getPlayers = gameId =>
  db.many(PLAYERS_FOR_GAME, [gameId])

const getCards = gameId =>
  db.many(CARDS_FOR_GAME, [gameId])

const getGameState = gameId =>
  db.one(GAME_STATE, [gameId])

const getPlayerState = (gameId, playerId) =>
  Promise.all([
    db.one(PLAYER_STATE, [gameId, playerId]),
    db.many(PLAYER_CARDS, [gameId, playerId])
  ])
    .then(([playerInfo, cards]) => ({
      id: playerInfo.player_id,
      position: playerInfo.position,
      team: playerInfo.team,
      cards
    }))

const getCardInfo = cardId =>
  db.one(CARD_INFO, [cardId])

const setLeadingSuit = (suit, gameId) =>
  db.one(SET_LEADING_SUIT, [suit, gameId])

const getInPlayCards = (gameId) => 
  db.manyOrNone(IN_PLAY_CARDS, [gameId])

module.exports = {
  getPlayers,
  getCards,
  getGameState,
  getPlayerState,
  getCardInfo,
  setLeadingSuit,
  getInPlayCards
}