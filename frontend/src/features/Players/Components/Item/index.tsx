import React, { FunctionComponent } from 'react';
import Icon from '@material-ui/core/Icon/index';
import { Card, Cards, Player } from 'alchemy-shared/types';
import { Droppable, DroppableStateSnapshot } from 'react-beautiful-dnd';
import { deletePlayer } from '../../Actions';
import { createCard } from '../../../Cards/Actions';
import CardList from '../../../Cards/Components/List';
import CardForm from '../../../Cards/Components/Form';
import './styles.css';

type Props = {
  player: Player;
}

const getPlayerItemClassName = (snapshot:DroppableStateSnapshot, cards:Cards) => {
  const isDragging = snapshot.isDraggingOver && cards.find(
    (card: Card) => String(card.id) === snapshot.draggingOverWith
  );

  return `player-item ${isDragging ? 'is-dragging-over' : ''}`;
};

const PlayerItem:FunctionComponent<Props> = ({ player }) => (
  <Droppable droppableId={String(player.id)}>
    {(provided, snapshot) =>
      <li className={getPlayerItemClassName(snapshot, player.cards)}>
      <div className="player-item-header player-item-row">
        <h4 className="player-name">{ player.name }</h4>
        <Icon
          onClick={deletePlayer(player.id, player.name)}
          aria-label="Delete"
        >
          remove_circle_outline
        </Icon>
      </div>
      <div className="player-item-row cards-list">
        <CardList
          cards={player.cards}
          provided={provided}
        />
      </div>
      <div className="player-item-row cards-form-wrapper">
        <CardForm onSubmit={createCard(player.id)} />
      </div>
    </li>
    }
  </Droppable>
);

export default PlayerItem;