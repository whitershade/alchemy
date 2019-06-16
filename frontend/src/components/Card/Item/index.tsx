import React from 'react';
import Card from '@material-ui/core/Card';
import {deleteCard} from '../../../api';
import './styles.css';
import Icon from "@material-ui/core/Icon";

// @ts-ignore
const CardItem = ({ name, id }) => (
  <li className="card-item">
    <Card>
      <div className="card-wrapper">
        <p className="card-name">{name}</p>
        <Icon
          onClick={() => deleteCard(id)}
          aria-label="Delete"
        >
          remove_circle_outline
        </Icon>
      </div>
    </Card>
  </li>
);

export default CardItem;
