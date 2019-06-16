import React from 'react';
import Icon from '@material-ui/core/Icon';
import {createCard, deletePlayer} from '../../../api';
import CardList from '../../Card/List';
import CardForm from '../../Card/Form';
import './styles.css';

const PlayerItem = ({ id, name, cards }) => {
  return (
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
      <div className="player-item-row">
        <CardForm onSubmit={createCard(id)} />
      </div>
    </li>
  );
};

export default PlayerItem;