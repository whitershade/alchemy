import React, { useEffect } from 'react';
import { forEach } from 'lodash';
import { connect } from 'react-redux';
import { createPlayer, loadPlayers, subscriptions as playerSubscriptions } from '../Players/Actions';
import { subscriptions as cardSubscriptions } from '../Cards/Actions';
import PlayerForm from '../Players/Components/Form';
import Players from '../Players/Container';
import './styles.css';

type Props = {
  subscribeToPlayers: Function;
  subscribeToPlayerCreated: Function;
  subscribeToPlayerDeleted: Function;

  subscribeToCardCreated: Function;
  subscribeToCardDeleted: Function;
  subscribeToCardReordered: Function;
}

const App = ({ ...subscriptions }: Props) => {
  useEffect(() => {
    loadPlayers();

    forEach(subscriptions, (subscription) => subscription());

  }, [subscriptions]);

  return (
    <div className="app">
      <PlayerForm onSubmit={createPlayer} />
      <Players />
    </div>
  );
};

const mapDispatchToProps = {
  ...playerSubscriptions,
  ...cardSubscriptions
};

export default connect(null, mapDispatchToProps)(App);


