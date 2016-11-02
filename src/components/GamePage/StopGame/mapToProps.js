import { 
    surrenderAct,
    setInitialStateAct
    } from '../../../helpers/actionCreators';

export const mapStateToProps = state => state.game.states;

export const mapDispatchToProps = dispatch => {
    return {
        return: () => {
            dispatch(setInitialStateAct());
        },
        surrender: () => {
            dispatch(surrenderAct());
        }
    }
};