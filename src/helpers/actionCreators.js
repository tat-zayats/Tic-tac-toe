let states = {
    created: false,
    creationLoading: false,
    creationError: false,
    started: false,
    startGoneError: false,
    startError: false,
    gameError: false,
    won: false
}

export function setCreationLoadingAct(){
    return{
        type: 'SET_STATE',
        state: { 
            ...states,
            creationLoading: true
        }
    }
}

export function setCreationErrorAct(){
    return{
        type: 'SET_STATE',
        state: { 
            ...states,
            creationError: true
        }
    }
}

export function createNewGameAct(id){
    return{
        type: 'CREATE_NEW_GAME',
        id
    }
}

export function joinGameAct(id){
    return{
        type: 'JOIN_GAME',
        gameId: id
    }
}

export function setStartErrorAct(){
    return{
        type: 'SET_STATE',
        state: { 
            ...states,
            created: true,
            startError: true
        }
    }
}

export function setStartGoneErrorAct(){
    return{
        type: 'SET_STATE',
        state: { 
            ...states,
            created: true,
            startGoneError: true
        }
    }
}

export function startGameAct(params = {}){
    return{
        type: 'START_GAME',
        ...params
    }
}

export function setGameErrorAct(){
    return{
        type: 'SET_STATE',
        state: { 
            ...states,
            created: true,
            started: true,
            gameError: true
        }
    }
}

export function makeMoveAct(move){
    return{
        type: 'MAKE_MOVE',
        move
    }
}

export function setMyMoveAct(params = {}){
    return{
        type: 'SET_MY_MOVE',
        ...params
    }
}

export function getRivalMoveAct(){
    return{
        type: 'GET_RIVAL_MOVE'
    }
}

export function setRivalMoveAct(params = {}){
    return{
        type: 'SET_RIVAL_MOVE',
        ...params
    }
}

export function surrenderAct(){
    return{
        type: 'SURRENDER'
    }
}

export function setInitialStateAct(){
    return{
        type: 'SET_INITIAL_STATE'
    }
}

export function createWsActions(data){
    if(data.error){
        return {
            type: 'SET_STATE',
            state: { 
            ...states,
            creationError: true
            }
        }
    }

    switch(data.action) {
        case 'add':
            return{
                type: 'ADD_GAME',
                id: data.id
            }
        
        case 'remove':
            return{
                type: 'REMOVE_GAME',
                id: data.id
            }

        case 'startGame':
            return{
                type: 'START_GAME',
                playerId: data.id
            }

        default: return;
    }
}
