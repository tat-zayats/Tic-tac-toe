import React from 'react';
// eslint-disable-next-line
import styles from './info.css';
import StopGame from '../StopGame/StopGame';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './mapToProps';

let Info = (props) => {

    if(props.states.created && !props.states.started){
        return(
            <div className='info loading'>
              <div className='message'>Ожидаем игроков...</div>
            </div>
        )
    }

    if(props.states.started){
        if(props.states.gameError){
            return(
                <div className='info started'>
                   <div className='message'>Неизвестная ошибка</div>
                    <StopGame />
                </div> 
            )
        }

        return(
            <div className='info started'>{
                props.message ? 
                    <div className='message'>{props.message}</div>
                    :
                    <div className='message'>{`${props.playingSide === 0 ? 'Нолик' : 'Крестик'} ходит`}</div>
                }
                {
                props.states.won || props.side === props.playingSide ?
                    <StopGame /> 
                    :
                    null
                }
            </div> 
        )

    }

    if(props.states.startError){
        return(
            <div className='info started'>
                <div className='message'>Неизвестная ошибка старта игры</div>
                <StopGame />
            </div> 
        )
    }

    if(props.states.startGoneError){
        return(
            <div className='info started'>
                <div className='message'>Ошибка старта игры: другой игрок не ответил</div>
                <StopGame />
            </div> 
        )
    }
}

Info = connect(mapStateToProps, mapDispatchToProps)(Info);
    
export default Info;