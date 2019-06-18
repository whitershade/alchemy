import React from 'react';
import Icon from '@material-ui/core/Icon/index';
import { deletePlayer } from '../../Actions';
import { createCard } from '../../../Cards/Actions';
import CardList from '../../../Cards/Components/List';
import CardForm from '../../../Cards/Components/Form';
import './styles.css';

const PlayerItem = ({ id, name, cards }) => (
  <li className="player-item">
    <div className="player-item-header player-item-row">
      <h4 className="player-name">{ name }</h4>
        <Icon
          onClick={deletePlayer(id, name)}
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