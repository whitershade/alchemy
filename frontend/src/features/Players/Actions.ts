import { Dispatch } from 'redux';
import { createAction } from 'redux-actions';
import * as types from './Constants';
import socket from '../../api/socket';

export const addPlayer = createAction(types.ADD_PLAYER);
export const addPlayers = createAction(types.ADD_PLAYERS);
export const removePlayer = createAction(types.REMOVE_PLAYER);

export const loadPlayers = () => socket.emit('get players');
export const createPlayer = (player: any) => {
    socket.emit('create player', player);
};
export const deletePlayer = (playerId:number, name:string) => () => {
    if(!window.confirm(`Are you really want to delete player ${name}?`)) return;

    socket.emit('delete player', playerId);
};

export const subscriptions = {
    subscribeToPlayers: () => async (dispatch: Dispatch) =>
      socket.on('send players',(players:Object) => dispatch(addPlayers(players))),

    subscribeToPlayerCreated: () => async (dispatch: Dispatch) =>
      socket.on('player created',(player:Object) => dispatch(addPlayer(player))),

    subscribeToPlayerDeleted: () => async (dispatch: Dispatch) =>
      socket.on('player deleted', (id:number) => dispatch(removePlayer(id)))
};