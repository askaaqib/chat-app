import { applyMiddleware, createStore } from "redux"
import logger from "redux-logger"
import thunk from  "redux-thunk"

import reducer from './reducer'

let middleware;
if(window.location.host == "localhost:3002") {
	middleware = applyMiddleware(thunk, logger());
} else {
	middleware = applyMiddleware(thunk);
}


export default createStore(reducer, middleware);