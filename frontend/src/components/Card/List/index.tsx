import React from 'react';
import { map } from 'lodash';
import Card from "../Item";
import './styles.css';

// @ts-ignore
const CardList = ({ cards }) => (
  <ul className="card-list">
    { map(cards, ({ name, id }) =>
      <Card key={id} id={id} name={name} />) }
  </ul>
);

export default CardList;
