import { Dispatch } from 'redux';
import { createAction } from 'redux-actions';
// @ts-ignore
import sharedConstants from 'alchemy-shared-constants';
import * as types from './Constants';
import socket from '../../api/socket';

export const addPlayer = createAction(types.ADD_PLAYER);
export const addPlayers = createAction(types.ADD_PLAYERS);
export const removePlayer = createAction(types.REMOVE_PLAYER);

export const loadPlayers = () => socket.emit(sharedConstants.socket.player.getAll);
export const createPlayer = (player: any) => {
    socket.emit(sharedConstants.socket.player.create, player);
};
export const deletePlayer = (playerId:number, name:string) => () => {
    if(!window.confirm(`Are you really want to delete player ${name}?`)) return;

    socket.emit(sharedConstants.socket.player.delete, playerId);
};

export const subscriptions = {
    subscribeToPlayers: () => async (dispatch: Dispatch) =>
      socket.on(sharedConstants.socket.player.sendAll,(players:Object) => dispatch(addPlayers(players))),

    subscribeToPlayerCreated: () => async (dispatch: Dispatch) =>
      socket.on(sharedConstants.socket.player.created,(player:Object) => dispatch(addPlayer(player))),

    subscribeToPlayerDeleted: () => async (dispatch: Dispatch) =>
      socket.on('player deleted', (id:number) => dispatch(removePlayer(id)))
};