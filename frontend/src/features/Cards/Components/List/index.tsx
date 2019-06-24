import React, { FunctionComponent } from 'react';
import { map } from 'lodash';
import { Card } from 'alchemy-shared/types';
import './styles.css';
import CardComponent from '../Item';

type Props = {
  cards: {
    [id: number]: Card;
  }
}

const CardList:FunctionComponent<Props> = ({ cards }) => (
  <ul className="card-list">
    { map(cards, (card) =>
      <CardComponent key={card.id} { ...card } />) }
  </ul>
);

export default CardList;
