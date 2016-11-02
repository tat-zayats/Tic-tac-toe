let states = {
    created: false,
    creationLoading: false,
    creationError: false,
    playersWaiting: false,
    playersWaitingError: false,
    started: false,
    startError: false,
    won: false
}

export function getInitialGameStore() {
    return {
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
            playersWaiting: false,
            playersWaitingError: false,
            started: false,
            startError: false,
            gameError: false,
            won: false
        },
        message: null
    }
}

export function  getCreatedState() {
    return{
        ...states, 
        created: true
    }
}

export function getStartedState(){
    return{
        ...states,
        created: true,
        started: true
    }
}

export function getWonState(){
    return{
        ...states,
        created: true,
        started: true,
        won: true
    }
}