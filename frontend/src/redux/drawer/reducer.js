import { actionType } from './actionType';

export const drawerReducer = (state = { visible: false}, action) => {
    switch(action.type){
        case actionType.SET_VISIBLE:
            return {
                ...state,
                visible: !state.visible
            }
        default:
            return state
    }
}