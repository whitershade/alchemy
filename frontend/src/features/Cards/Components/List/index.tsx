import React, { FunctionComponent } from 'react';
import { map } from 'lodash';
import { Cards } from 'alchemy-shared/types';
import './styles.css';
import CardComponent from '../Item';

type Props = {
  cards: Cards
  provided: {
    innerRef: (element:HTMLElement | any) => any
    droppableProps: object,
    placeholder?: any
  }
}

const CardList:FunctionComponent<Props> = ({ cards, provided }) => (
  <ul
    className="card-list"
    ref={provided.innerRef}
    {...provided.droppableProps}
  >
    { map(cards, (card, index) =>
      <CardComponent
        key={card.id}
        card={card}
        index={index}
      />) }
    {provided.placeholder}
  </ul>
);

export default CardList;
