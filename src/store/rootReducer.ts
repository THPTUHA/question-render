import {combineReducers} from 'redux';
import examReducer from './exam/slice';

const appReducer = combineReducers({
    exam: examReducer,
});


export default appReducer;