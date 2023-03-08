// combines entire reducers and export as root reducers:

import { combineReducers } from "redux";
import { userReducer } from './userReducer'

const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;