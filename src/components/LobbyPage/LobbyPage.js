import React from 'react';
import GamesList from './GamesList/GamesList';
import Message from './Message/Message';
import StartGame from './StartGame/StartGame';
// eslint-disable-next-line
import styles from './lobbyPage.css';

const LobbyPage = (props) => 
    <div className='lobbyPage'>
        <div className='container'>
            <GamesList />
            <Message />
            <StartGame />
        </div>
    </div>

export default LobbyPage;