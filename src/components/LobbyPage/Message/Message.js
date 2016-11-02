import { connect } from 'react-redux';
// eslint-disable-next-line
import styles from './message.css';
import { mapStateToProps, mapDispatchToProps } from './mapToProps';
import React from 'react';


let Message = (props) => {
    if(props.creationLoading){
        return <div className='message loading'>Загрузка...</div>;
    }
    if(props.creationError){
        return <div className='message error'>Ошибка создания игры. Попробуйте еще раз.</div>;
    }
    return null;
}

Message = connect(mapStateToProps, mapDispatchToProps)(Message);

export default Message;