// combines entire reducers and export as root reducers:

import { combineReducers } from "redux";
import { userReducer } from './userReducer'
import { searchReducer } from "./searchReducer";

const rootReducer = combineReducers({
    user: userReducer,
    search: searchReducer
});

export default rootReducer;