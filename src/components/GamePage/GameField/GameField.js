import React from 'react';
// eslint-disable-next-line
import styles from './gameField.css';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './mapToProps';
import classNames from 'classnames';


let GameField = (props) => 
    props.states.started ? 
    <table className='gameField'>
        <caption>
            Вы играете за
            <span>{props.side === 0 ? 'o' : 'x'}</span>
        </caption>
        <tbody>
            {
                props.gameField.map((row, rowIdx) =>
                    <tr key={rowIdx + 1}>
                    {
                        row.map((cell, cellIdx) => {
                            const value = row[cellIdx][0];
                            return(<td
                                key={rowIdx * 10 + 1 + cellIdx} 
                                onClick={() => props.onClick(rowIdx * 10 + 1 + cellIdx)}
                                className={ classNames({
                                    'cross': value === 1,
                                    'zero': value === 0
                                })}
                            ></td>);
                        })
                    }
                    </tr>
                )
            }
        </tbody>
    </table> 
    :
    null

GameField = connect(mapStateToProps, mapDispatchToProps)(GameField);

export default GameField;