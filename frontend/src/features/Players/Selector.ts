import { createStructuredSelector } from 'reselect';

// @ts-ignore
const selector = state => state.players.data;

export default createStructuredSelector({
  players: selector
})
