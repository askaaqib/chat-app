//actions
import * as A from './actions';
import { SET_ROOM } from '../chat/actions';

//api calls
import { postRoom, authenticateRoom } from '../api/auth';

// router history for redirecting
import { browserHistory } from 'react-router';

export const createRoom = (formData) => {
	return (dispatch) => {
		dispatch({type: A.CREATING_ROOM });

		postRoom(formData)
			.then((response) => {
				console.log(response);
				if(response.status == 201) {
					dispatch({type: A.CREATED_ROOM});
					dispatch({type: SET_ROOM, payload: response.data});
					browserHistory.push('/chat');
				}
			})
			.catch((error) => {
				console.log(error);
			})
	};
};

export const joinRoom = (formData) => {
	return (dispatch) => {
		dispatch({type: A.AUTHENTICATING_ROOM });

		authenticateRoom(formData)
			.then((response) => {
				console.log(response);
				if(response.status == 200) {
					dispatch({type: A.AUTHENTICATED_ROOM });
					dispatch({type: SET_ROOM, payload: response.data});
					browserHistory.push('/chat');
				}
			})
			.catch((error) => {
				console.log(error);
			})
	};
};