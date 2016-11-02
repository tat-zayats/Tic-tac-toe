import React from 'react';
import GameField from './GameField/GameField';
import Info from './Info/Info';
// eslint-disable-next-line
import styles from './gamePage.css';

const GamePage = (props) =>
    <div className='gamePage'>
        <Info /> 
        <GameField />
    </div>

export default GamePage;