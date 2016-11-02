import { connect } from 'react-redux';
// eslint-disable-next-line
import styles from './startGame.css';
import { mapStateToProps, mapDispatchToProps } from './mapToProps';
import React from 'react';

let StartGame = (props) => 
    props.creationLoading ?
        <button className='startGame' onClick={props.onClick} disabled>Начать игру</button> :
        <button className='startGame' onClick={props.onClick} >Начать игру</button>

StartGame = connect(mapStateToProps, mapDispatchToProps)(StartGame);

export default StartGame;