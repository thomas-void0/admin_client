import {CHANGE_TIME} from '../actions/actionTypes/action-admin-type';
import getTimeNow from '../tools/getTime';
const defaultTime ={time:getTimeNow()}
export default (state = defaultTime,action)=>{
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case CHANGE_TIME:
            newState ={time:getTimeNow()}
            return newState
        default:
            return newState
    }
}