import React, { FunctionComponent } from 'react';
import { map } from 'lodash';
import { Player, Players } from 'alchemy-shared/types';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import PlayerItem from '../Item';
import './styles.css';

type Props = {
  players: Players;
  reorderCards: Function;
};

const onDragEnd = (players:Players, reorderCards:Function) => (result:DropResult) => {
  const { destination, source } = result;

  if (!destination) return;

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) return;

  reorderCards(result);
};

const PlayersList:FunctionComponent<Props> = ({ players, reorderCards }) => (
  <DragDropContext onDragEnd={onDragEnd(players, reorderCards)}>
    <ul className="players-list">
      { map(players, (player: Player) =>
        <PlayerItem key={player.id} player={player} />) }
    </ul>
  </DragDropContext>
);

export default PlayersList;