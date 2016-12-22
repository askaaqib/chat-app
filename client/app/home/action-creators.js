//actions
import * as A from './actions';
import { SET_ROOM } from '../chat/actions';

//api calls
import { postRoom, authenticateRoom } from '../api/auth';

// router history for redirecting
import { browserHistory } from 'react-router';

export const editingField = (field) => {
	return (dispatch) => {
		switch(field) {
			case 'room-name':
				dispatch({type: A.EDITING_ROOM_NAME})
				break;
			case 'password': 
				dispatch({type: A.EDITING_PASSWORD})
				break;
		}

	}
};

export const createRoom = (formData) => {
	return (dispatch) => {

		dispatch({type: A.CREATING_ROOM });
		
		if(formData.room_name.length && formData.password.length && formData.username.length) {

			postRoom(formData)
				.then((response) => {
					if(response.status == 201) {
						dispatch({type: A.CREATED_ROOM});
						dispatch({type: SET_ROOM, payload: response.data});
						browserHistory.push('/chat');
					}
				})
				.catch((err) => {
					let error = err.response;
					if(error.status == 400) {
						//room name taken
						if(error.data.errno == 1062) {
							dispatch({type: A.ROOM_NAME_TAKEN});
						} 
					}
				})
				//either room name or password missing
			} else {
				dispatch({type: A.INCOMPLETE_FORM});
			}
	};
};

export const joinRoom = (formData) => {
	return (dispatch) => {
		
		dispatch({type: A.AUTHENTICATING_ROOM });
		
		if(formData.room_name.length && formData.password.length && formData.username.length) {

		authenticateRoom(formData)
			.then((response) => {
				if(response.status == 200) {
					dispatch({type: A.AUTHENTICATED_ROOM });
					dispatch({type: SET_ROOM, payload: response.data});
					browserHistory.push('/chat');
				}
			})
			.catch((err) => {
				let error = err.response;
				if(error.status == 404) {
					//room not found
					dispatch({type: A.ROOM_NOT_FOUND});
				}

				if(error.status == 401) {
					dispatch({type: A.INCORRECT_PASSWORD})
				}

			})
			//either room name or password missing
		} else {
			dispatch({type: A.INCOMPLETE_FORM});
		}
	};
};