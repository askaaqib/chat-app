import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import homeReducer from './home/reducer.js';
// combines all the reducers into one main reducer object passed into the store.js
const appReducer = combineReducers({
	routing: routerReducer, 
	home: homeReducer
});

const rootReducer = (state, action) => {
	// state resetter for specific actions

	return appReducer(state, action);
};

export default rootReducer;