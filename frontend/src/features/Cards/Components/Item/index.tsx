import React, { FunctionComponent } from 'react';
import { Card } from 'alchemy-shared/types';
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
    {(provided, snapshot) =>
      <li
        className={`card-item ${snapshot.isDragging ? 'isDragging' : ''}`}
        ref={provided.innerRef}
        { ...provided.draggableProps }
      >
          <div className="card-wrapper">
            <p
              { ...provided.dragHandleProps }
              className="card-name"
            >
              {card.name}
            </p>
            <Icon
              onClick={deleteCard(card.id)}
              aria-label="Delete"
            >
              remove_circle_outline
            </Icon>
          </div>
      </li>
    }
  </Draggable>
);

export default CardItem;
