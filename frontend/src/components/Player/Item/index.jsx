import React from 'react';
import {createCard, deletePlayer} from '../../../api';
import CardList from '../../Card/List';
import CardForm from '../../Card/Form';
import './styles.css';

const PlayerItem = ({ id, name, cards }) => {
  return (
    <li className="player-item">
      <span>{ name }</span>
      <button onClick={() => deletePlayer(id)}>Delete player</button>
      <CardForm onSubmit={createCard(id)} />
      <CardList cards={cards} />
    </li>
  );
}

export default PlayerItem;