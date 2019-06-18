import React from 'react';
import Icon from '@material-ui/core/Icon';
import { createCard } from '../../../api/cards';
import { deletePlayer } from '../../../api/players';
import CardList from '../../Card/List';
import CardForm from '../../Card/Form';
import './styles.css';

const PlayerItem = ({ id, name, cards }) => (
  <li className="player-item">
    <div className="player-item-header player-item-row">
      <h4 className="player-name">{ name }</h4>
        <Icon
          onClick={() => deletePlayer(id)}
          aria-label="Delete"
        >
            remove_circle_outline
        </Icon>
    </div>
    <div className="player-item-row cards-list">
      <CardList cards={cards} />
    </div>
    <div className="player-item-row cards-form-wrapper">
      <CardForm onSubmit={createCard(id)} />
    </div>
  </li>
);

export default PlayerItem;