import React from 'react';
import { map } from 'lodash';
import PlayerItem from '../Item';
import './styles.css';

// @ts-ignore
const PlayersList = ({ players }) => (
  <ul className="players-list">
    { map(players, ({ id, name, cards }) =>
      <PlayerItem key={id} id={id} name={name} cards={cards} />) }
  </ul>
);

export default PlayersList;