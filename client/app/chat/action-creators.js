import * as A from './actions';

export const addNewEvent = (messageData) => {
	return (dispatch) => {
		dispatch({type: A.NEW_EVENT, payload: messageData });
	};
};