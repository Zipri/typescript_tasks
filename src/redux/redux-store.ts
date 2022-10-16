import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";

import tasksReducer from "./tasks-reducer";



let reducers = combineReducers({
    tasksPage: tasksReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));


export default store;