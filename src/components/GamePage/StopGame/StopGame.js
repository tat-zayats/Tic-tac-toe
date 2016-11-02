import React from 'react';
// eslint-disable-next-line
import styles from './stopGame.css';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './mapToProps';

let StopGame = (props) => {
    if(props.won || props.startError || props.startGoneError || props.gameError){
        return <button onClick={props.return} className='newGame'>Новая игра</button>
    }
    if(props.started){
        return <button onClick={props.surrender} className='stopGame'>Сдаться</button>
    } 
}

StopGame = connect(mapStateToProps, mapDispatchToProps)(StopGame);

export default StopGame;
