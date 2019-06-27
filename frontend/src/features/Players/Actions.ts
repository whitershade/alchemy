import { Dispatch } from 'redux';
import { createAction } from 'redux-actions';
import socketConstants from 'alchemy-shared/constants/socket';
import { Player, Players } from 'alchemy-shared/types';
import * as types from './Constants';
import socket from '../../utils/socket';

export const addPlayer = createAction(types.ADD_PLAYER);
export const addPlayers = createAction(types.ADD_PLAYERS);
export const removePlayer = createAction(types.REMOVE_PLAYER);

export const loadPlayers = () => socket.emit(socketConstants.player.getAll);

// should return undefined to prevent final form error
export const createPlayer = (player: Player) => {
    socket.emit(socketConstants.player.create, player);
};
export const deletePlayer = (playerId:number, name:string) => () => {
    if (!window.confirm(`Are you really want to delete player ${name}?`)) return;

    socket.emit(socketConstants.player.delete, playerId);
};

export const subscriptions = {
    subscribeToPlayers: () => async (dispatch: Dispatch) =>
      socket.on(socketConstants.player.sendAll,(players:Players) => dispatch(addPlayers(players))),

    subscribeToPlayerCreated: () => async (dispatch: Dispatch) =>
      socket.on(socketConstants.player.created,(player:Player) => dispatch(addPlayer(player))),

    subscribeToPlayerDeleted: () => async (dispatch: Dispatch) =>
      socket.on('player deleted', (id:number) => dispatch(removePlayer(id)))
};