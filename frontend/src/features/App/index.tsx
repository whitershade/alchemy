import React, {useEffect} from 'react';
import { forEach } from 'lodash';
import { connect } from 'react-redux';
import {
  createPlayer,
  loadPlayers,
  subscriptions as playerSubscriptions
} from '../Players/Actions';
import {
  subscriptions as cardSubscriptions
} from '../Cards/Actions';
import PlayerForm from '../Players/Components/Form';
import Players from '../Players/Container';
import './styles.css';

const App: React.FC = ({ ...subscriptions }) => {
  useEffect(() => {
    loadPlayers();

    // @ts-ignore
    forEach(subscriptions, (subscription) => subscription());

  }, []);

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


