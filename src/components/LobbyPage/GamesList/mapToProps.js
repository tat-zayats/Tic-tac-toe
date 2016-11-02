import {joinGameAct} from '../../../helpers/actionCreators';

export const mapStateToProps = state => state.lobby;

export const mapDispatchToProps = dispatch => {
    return {
        onClick: (id) => {
            dispatch(joinGameAct(id));
        }
    }
};