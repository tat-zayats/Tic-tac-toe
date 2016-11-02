import { createNewGameAct } from '../../../helpers/actionCreators';

export const mapStateToProps = state => state.game.states;

export const mapDispatchToProps = dispatch => {
    return {
        onClick: () => {
            dispatch(createNewGameAct());
        }
    }
};