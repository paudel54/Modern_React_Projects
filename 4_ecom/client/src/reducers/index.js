// combines entire reducers and export as root reducers:

import { combineReducers } from "redux";
import { userReducer } from './userReducer'
import { searchReducer } from "./searchReducer";
import { cartReducer } from "./cartReducer";
import { drawerReducer } from './drawerReducer';

const rootReducer = combineReducers({
    user: userReducer,
    search: searchReducer,
    cart: cartReducer,
    drawer: drawerReducer
});

export default rootReducer;