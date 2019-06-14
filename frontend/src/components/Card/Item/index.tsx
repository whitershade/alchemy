import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {deleteCard} from '../../../api';
import './styles.css';

// @ts-ignore
const CardItem = ({ name, id }) => (
  <li className="card-item">
    <Card>
      <CardContent>
        <h3 className="card-name">{name}</h3>
      </CardContent>
      <CardActions>
        <button onClick={() => deleteCard(id)}>Delete</button>
        {/*<Button onClick={() => deleteCard(id)}>Delete</Button>*/}
      </CardActions>
    </Card>
  </li>
);

export default CardItem;
