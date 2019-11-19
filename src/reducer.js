import {combineReducers} from 'redux';
import menuReducer from './reducers/reducer-menu';
import adminReducer from './reducers/reducer-admin';
import categoryReducer from './reducers/reducer-category';
import pictureWallReducer from './reducers/reducer-picture-wall';

let reducer = combineReducers({
    menu:menuReducer,
    admin:adminReducer,
    category:categoryReducer,
    pictureWall:pictureWallReducer,
})
export default reducer