import { omitBy } from "lodash";
import { useState } from 'react';

export default initialValue => {
  const [players, setPlayers] = useState(initialValue);

  return {
    players,
    setPlayers,
    addPlayer: player =>
      setPlayers((players) => ({ ...players, [player.id]: player })),
    deletePlayer: playerId =>
      setPlayers((players) => omitBy(players, ({ id }) => id === playerId)),
    addCard: card => {
      setPlayers((players) => {
        return {
          ...players,
          [card.playerId]: {
            ...players[card.playerId],
            cards: {
              ...players[card.playerId].cards,
              [card.id]: card
            }
          }
        }
    });
  },
  deleteCard: card => {
      setPlayers((players) => {
        return {
          ...players,
          [card.playerId]: {
            ...players[card.playerId],
            cards: omitBy(players[card.playerId].cards, ({ id }) => id === card.id)
          }
        }
      })
  }}
};