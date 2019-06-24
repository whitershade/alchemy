import React, { FunctionComponent } from 'react';
import CardComponent from '@material-ui/core/Card';
import { deleteCard } from '../../Actions';
import './styles.css';
import Icon from "@material-ui/core/Icon";
import { Card } from 'alchemy-shared/types';

const CardItem:FunctionComponent<Card> = ({ name, id }) => (
  <li className="card-item">
    <CardComponent>
      <div className="card-wrapper">
        <p className="card-name">{name}</p>
        <Icon
          onClick={deleteCard(id)}
          aria-label="Delete"
        >
          remove_circle_outline
        </Icon>
      </div>
    </CardComponent>
  </li>
);

export default CardItem;
