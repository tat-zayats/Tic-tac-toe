import {makeMoveAct} from '../../../helpers/actionCreators';

export const mapStateToProps = state => state.game;

export const mapDispatchToProps = dispatch => {
    return {
        onClick: (id) => {
            dispatch(makeMoveAct(id));
        }
    }
};