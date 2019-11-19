import {CHANGE_COLLAPSED} from '../actions/actionTypes/action-menu-type'

const defaultValue = false

export default (state=defaultValue,action)=>{
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case CHANGE_COLLAPSED:
            return newState = !newState
        default:
            return newState
    }
}