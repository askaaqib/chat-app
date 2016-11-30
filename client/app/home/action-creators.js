import * as A from './actions';
import { postRoom, authenticateRoom } from '../api/auth';

export const createRoom = (formData) => {
	return (dispatch) => {
		dispatch({type: A.CREATING_ROOM });

		postRoom(formData)
			.then((response) => {
				if(response.status == 201) {
					dispatch({type: A.CREATED_ROOM});
				}
			})
			.catch((error) => {
				console.log(error);
			})
	};
};

export const joinRoom = (formData) => {
	return (dispatch) => {
		dispatch({type: A.JOINING_ROOM });

		authenticateRoom(formData)
			.then((response) => {
				console.log(response);
				if(response.status == 200) {
					dispatch({type: A.JOINED_ROOM });
				}
			})
			.catch((error) => {
				console.log(error);
			})
	};
};