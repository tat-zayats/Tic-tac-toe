import { createStore, combineReducers } from 'redux';
import middlewares from './helpers/middlewares';
import * as reducers from './helpers/reducers';

const reducer = combineReducers(reducers);
const defaultState = {
        lobby: {
            games: []
        },
        game: {
            gameId: null,
            playerId: null,
            side: null,
            playingSide: null,
            gameField: [
                [[], [], [], [], [], [], [], [], [], []],
                [[], [], [], [], [], [], [], [], [], []],
                [[], [], [], [], [], [], [], [], [], []],
                [[], [], [], [], [], [], [], [], [], []],
                [[], [], [], [], [], [], [], [], [], []],
                [[], [], [], [], [], [], [], [], [], []],
                [[], [], [], [], [], [], [], [], [], []],
                [[], [], [], [], [], [], [], [], [], []],
                [[], [], [], [], [], [], [], [], [], []],
                [[], [], [], [], [], [], [], [], [], []]
            ],
            states:{
                created: false,
                creationLoading: false,
                creationError: false,
                started: false,
                startGoneError: false,
                startError: false,
                won: false
            },
            message: null
        }
    };

const store = createStore(
    reducer,
    defaultState,
    middlewares
);

window.store = store;

export default store;