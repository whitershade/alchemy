import React, { FunctionComponent } from 'react';
import { map } from 'lodash';
import { Player, Players } from "alchemy-shared/types";
import PlayerItem from '../Item';
import './styles.css';

type Props = {
  players: Players
};

const PlayersList:FunctionComponent<Props> = ({ players }) => (
  <ul className="players-list">
    { map(players, (player: Player) =>
      <PlayerItem key={player.id} { ...player } />) }
  </ul>
);

export default PlayersList;