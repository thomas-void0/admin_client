import {GET_DATA,CHANGE_LOADING} from '../actions/actionTypes/action-category-type'

const defaultValue = {
    data:null,
    loading:false
}

export default (state=defaultValue,action)=>{
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case GET_DATA:
            newState.data = action.msg 
            return newState
        case CHANGE_LOADING:
            newState.loading = action.loading 
            return newState
        default:
            return newState
    }
}
