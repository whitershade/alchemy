import React, { useEffect } from 'react';
import {
  subscribeToPlayers,
  createPlayer,
  subscribeToPlayerCreated,
  subscribeToPlayerDeleted,
  subscribeToCardCreated,
  subscribeToCardDeleted
} from '../../api';
import PlayerForm from '../Player/Form';
import getPlayersState from '../../getPlayersState';
import PlayersList from '../Player/List';
import './styles.css';

const useFetch = () => {
  const {
    players,
    setPlayers,
    addPlayer,
    deletePlayer,
    addCard,
    deleteCard
  } = getPlayersState({});

  useEffect(() => {
    subscribeToPlayers((players:any) => setPlayers(players));
    subscribeToPlayerCreated((player:any) => addPlayer(player));
    subscribeToPlayerDeleted((playerId: number) => deletePlayer(playerId));
    subscribeToCardCreated((card:Object) => addCard(card));
    subscribeToCardDeleted((cardId:number) => deleteCard(cardId));
  }, []);

  return [players, setPlayers];
};

const Index: React.FC = () => {
  const [players] = useFetch();

  return (
    <div className="app">
      <PlayerForm onSubmit={createPlayer} />
      <PlayersList players={players} />
    </div>
  );
};

export default Index;
