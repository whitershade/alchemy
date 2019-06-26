import React, { FunctionComponent } from 'react';
import { Card } from 'alchemy-shared/types';
import CardComponent from '@material-ui/core/Card';
import Icon from "@material-ui/core/Icon";
import { Draggable } from "react-beautiful-dnd";
import { deleteCard } from '../../Actions';
import './styles.css';

type Props = {
  card: Card;
  index: number;
};

const CardItem:FunctionComponent<Props> = ({ card, index }) => (
  <Draggable draggableId={String(card.id)} index={index}>
    {provided =>
      <li
        className="card-item"
        ref={provided.innerRef}
        { ...provided.draggableProps }
        { ...provided.dragHandleProps }
      >
        <CardComponent>
          <div className="card-wrapper">
            <p className="card-name">{card.name}</p>
            <Icon
              onClick={deleteCard(card.id)}
              aria-label="Delete"
            >
              remove_circle_outline
            </Icon>
          </div>
        </CardComponent>
      </li>
    }
  </Draggable>
);

export default CardItem;
