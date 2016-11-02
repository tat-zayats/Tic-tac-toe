import createLogger from 'redux-logger';
import { applyMiddleware } from 'redux';
import {
        createNewGameAct,
        startGameAct, 
        setInitialStateAct,
        setCreationLoadingAct, 
        setCreationErrorAct,
        setStartErrorAct,
        setStartGoneErrorAct,
        setGameErrorAct,
        setMyMoveAct,
        setRivalMoveAct,
        getRivalMoveAct,
        } from './actionCreators';
import ws from '../index';

const logger = createLogger();

const createNewGame = store => next => action => {
    if(action.type !== 'CREATE_NEW_GAME'){
        next(action);
        return;
    }
    next(setCreationLoadingAct());
    fetch('http://xo.t.javascript.ninja/newGame', {
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8"  
        }
    })
    .then(r => r.json())
    .then(r => {
        next(createNewGameAct(r.yourId));
        const json = JSON.stringify({register: r.yourId});
        ws.send(json);
    })
    .catch(e => next(setCreationErrorAct()))
};

const joinGame = store => next => action => {
    if(action.type !== 'JOIN_GAME'){
        next(action);
        return;
    }
    next(createNewGameAct(action.gameId));
    const json = JSON.stringify({register: action.gameId});
    ws.send(json);
};

const startGame = store => next => action => {
    if(action.type !== 'START_GAME'){
        next(action);
        return;
    }
    const { gameId } = store.getState().game;
    const { playerId } = action;
    const body = JSON.stringify({player: playerId, game: gameId});

    fetch('http://xo.t.javascript.ninja/gameReady', {
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8"  
        },
        body
    })
    .then(r => r.json())
    .then(r => {
        if(r.message){
            next(setStartErrorAct());
            return;
        }
        next(startGameAct({
            playerId,
            side: r.side,
            playingSide: 1
        }));
        if(r.side === 'o'){
            next(getRivalMoveAct());
        }
    })
    .catch(er => {
        if(er.status === 410){
            next(setStartGoneErrorAct());
        } else {
            next(setStartErrorAct());
        }
    })
};

const makeMove = store => next => action => {
    if(action.type !== 'MAKE_MOVE'){
        next(action);
        return;
    }
    const { gameId, playerId, playingSide, side } = store.getState().game;
    if(side !== playingSide){return;}

    const body = JSON.stringify({move: action.move});

    fetch('http://xo.t.javascript.ninja/move', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Game-ID": `${gameId}`,
            "Player-ID": `${playerId}`
        },
        body
    })
    .then(r => r.json())
    .then(r => {
        if(r.success){
            next(setMyMoveAct({
                move: action.move,
                win: r.win ? true : false,
                message: r.win ? r.win : null
            }))
            if(!r.win){next(getRivalMoveAct())}
        }
    })
    .catch(er => next(setGameErrorAct()))
}

const getRivalMove = store => next => action => {
    if(action.type !== 'GET_RIVAL_MOVE'){
        next(action);
        return;
    }

    const { gameId, playerId } = store.getState().game;
    const get = () => 
        fetch('http://xo.t.javascript.ninja/move', {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Game-ID": `${gameId}`,
                "Player-ID": `${playerId}`
            }
        })
        .then(r => r.json())
        .then(r => {
            next(setRivalMoveAct({
                move: r.move ? r.move : null,
                win: r.win ? true : false,
                message: r.win ? r.win : null
            }));     
        })
        .catch(er => get());

        get();
    }

const surrender = store => next => action => {
    if(action.type !== 'SURRENDER'){
        next(action);
        return;
    }
    const { gameId, playerId } = store.getState().game;
        fetch('http://xo.t.javascript.ninja/surrender', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Game-ID": `${gameId}`,
                "Player-ID": `${playerId}`
            }
        })
        .then(r => next(setInitialStateAct()),
              er => next(setInitialStateAct()));
}


const middlewares = applyMiddleware(
    logger, 
    createNewGame,
    joinGame,
    startGame,
    makeMove,
    getRivalMove,
    surrender
);

export default middlewares;
