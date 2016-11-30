import * as A from './actions';

export const addNewMessage = (messageData) => {
	return (dispatch) => {
		dispatch({type: A.NEW_MESSAGE, payload: messageData });
	};
};