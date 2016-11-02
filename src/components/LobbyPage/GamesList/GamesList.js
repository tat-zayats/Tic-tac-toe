import { connect } from 'react-redux';
// eslint-disable-next-line
import styles from './gamesList.css';
import { mapStateToProps, mapDispatchToProps } from './mapToProps';
import React from 'react';

let GamesList = (props) => 
    <div className='wrapper'>
        <ul className='gamesList'>
        {
            props.games.map(game => 
            <li onClick={() => props.onClick(game)} key={game}>{game}</li>)
        }
        </ul>
    </div>

GamesList = connect(mapStateToProps, mapDispatchToProps)(GamesList);

export default GamesList;