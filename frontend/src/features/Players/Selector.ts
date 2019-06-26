import { createSelector, createStructuredSelector } from 'reselect';
import { map, sortBy } from 'lodash';
import {Player} from "alchemy-shared/types";

const players = (state:any) => state.players.data;

const playersWithSortedCards = createSelector(
  [players],
  (players) => map(players, (player: Player) => ({
    ...player,
      cards: sortBy(player.cards, 'order')
  }))
);

export default createStructuredSelector({
  players: playersWithSortedCards
})
