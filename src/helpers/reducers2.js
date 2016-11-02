import update from 'react-addons-update'; 
import {
        getInitialGameStore,
        getCreatedState,
        getStartedState,
        getWonState
    } from './helpers';

export const lobby = (state = {}, action) => {
    switch(action.type) {
        case 'ADD_GAME':  
            return update(state, {
                games: {
                    $push: [action.id]
                }
            });

        case 'REMOVE_GAME':  
            return update(state, {
                games: {
                    $splice: [[state.games.indexOf(action.id), 1]]
                }
            });

        default: return state;
    }
}

export const game = (state = {}, action) => {
    switch(action.type) {

        case 'CREATE_NEW_GAME':
            return update(state, {
                gameId: {
                    $set: action.id
                },
                states: {
                    $merge: getCreatedState()
                }
            });

        case 'START_GAME':
            return update(state, {
                playerId: {
                    $set: action.playerId
                },
                side: {
                    $set: action.side === 'o' ? 0 : 1
                },
                playingSide: {
                    $set: action.playingSide
                },
                states: {
                    $merge: getStartedState()
                }
            });

        case 'SET_MY_MOVE':
            let move = action.move - 1;
            let rowIdx = Math.floor(move / 10);
            let cellIdx = Math.round((move / 10 - rowIdx) * 10);
            let newGameField = [].concat(state.gameField);
            console.log('IDX', rowIdx, cellIdx);
            newGameField[rowIdx][cellIdx].push(state.side);

            return action.win ? 
                update(state,{

                    gameField: {
                        $set: newGameField
                    },
                    states: {
                        $merge: getWonState()
                    },
                    winner:{
                        $set: state.playingSide
                    },
                    message:{
                        $set: action.message
                    }
                }) 
                :
                update(state,{
                    gameField: {
                        $set: newGameField
                    },
                    playingSide: {
                        $set: state.playingSide === 1 ? 0 : 1
                    },
                    message:{
                        $set: action.message
                    }
                }) 

        case 'SET_RIVAL_MOVE':
            newGameField = [].concat(state.gameField);

            if(action.move){
                move = action.move - 1;
                rowIdx = Math.floor(move / 10);
                cellIdx = Math.round((move / 10 - rowIdx) * 10);
                newGameField[rowIdx][cellIdx].push(state.playingSide);
                console.log('IDX r', state.playingSide , rowIdx, cellIdx);
            }

            return action.win ? 
                update(state,{
                    gameField: {
                        $set: newGameField
                    },
                    states: {
                        $merge: getWonState()
                    },
                    winner:{
                        $set: state.playingSide
                    },
                    message:{
                        $set: action.message
                    }
                }) 
                :
                update(state,{
                    gameField: {
                        $set: newGameField
                    },
                    playingSide: {
                        $set: state.playingSide === 1 ? 0 : 1
                    },
                    message:{
                        $set: action.message
                    }
                });

        case 'SET_INITIAL_STATE': 
            return getInitialGameStore();

        case 'SET_STATE':  
        
        console.log('STATE', action.state);
            return update(state, { 
                states: {
                    $merge: action.state
                }
            });



        
        // case 'SET_GAME_ID':  
        // console.log('IDDDD');
        //     return update(state, {
        //         gameId: {
        //             $set: action.gameId
        //         }
        //     });

        // case 'SET_PLAYER_ID':
        //     return update(state, {
        //         playerId: {
        //             $set: action.playerId
        //         }
        //     });

        // case 'SET_GAME_SIDE':
        //     return update(state, {
        //         side: {
        //             $set: action.side
        //             }       
        //         });

        // case 'SET_PLAYING_SIDE':
        //     console.log('SETTTT PS', action.side);
        //     return update(state, {
        //         playingSide: {
        //             $set: action.side
        //             }       
        //         });


        // case 'MARK_MOVE':
        //      move = action.move - 1;
        //      rowIdx = Math.floor(move / 10);
        //      cellIdx = Math.round((move / 10 - rowIdx) * 10);
        //      newGameField = [].concat(state.gameField);
        //     console.log('IDX', rowIdx, cellIdx);
        //     newGameField[rowIdx][cellIdx].push(action.side);
        //     return update(state, { 
        //         gameField: {
        //             $set: newGameField
        //         }
        //     });

        // case 'SET_WINNER':
        // console.log('RED WINNER', action.side);
        //     return update(state, { 
        //         winner: {
        //             $set: action.side
        //         }
        //     });

        default: return state;
    }
}
    