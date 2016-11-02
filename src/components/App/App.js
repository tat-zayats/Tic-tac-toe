import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './mapToProps';
import LobbyPage from '../LobbyPage/LobbyPage';
import GamePage from '../GamePage/GamePage';

let App = (props) => 
    props.game.states.created ?
         <GamePage /> : <LobbyPage />


App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;