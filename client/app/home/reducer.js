import * as A from './actions';
const initialState = {
	created_room: false,
	creating_room: false, 
	authenticating_room: false,
	authenticated_room: false,
	room_name_taken: false,
	room_not_found: false,
	incomplete_form: false,
	incorrect_password: false
}

const homeReducer = (state = initialState, action) => {
	switch (action.type) {
		case A.CREATING_ROOM: 
			return { 
				...state, 
				creating_room: true,
				authenticating_room: false,
				room_name_taken: false, 
				incomplete_form: false, 
				room_not_found: false,
				incorrect_password: false
			};
		case A.CREATED_ROOM: 
			return { 
				...state, 
				creating_room: false, 
				created_room: true,
				room_name_taken: false, 
				incomplete_form: false, 
				room_not_found: false,
				incorrect_password: false
			};
		case A.AUTHENTICATING_ROOM: 
			return { 
				...state, 
				authenticating_room: true,
				creating_room: false,
				room_name_taken: false, 
				incomplete_form: false, 
				room_not_found: false,
				incorrect_password: false,
			};
		case A.AUTHENTICATED_ROOM: 
			return { 
				...state, 
				authenticated_room: true , 
				authenticating_room: false,
				room_name_taken: false, 
				incomplete_form: false,
				room_not_found: false,
				incorrect_password: false
			};
		case A.ROOM_NAME_TAKEN: 
			return { ...state, room_name_taken: true };
		case A.INCOMPLETE_FORM: 
		console.log('inside reducer');
			return { ...state, incomplete_form: true };
		case A.EDITING_ROOM_NAME:
			return { ...state, room_name_taken: false, room_not_found: false };
		case A.ROOM_NOT_FOUND: 
			return { ...state, room_not_found: true };
		case A.INCORRECT_PASSWORD: 
			return { ...state, incorrect_password: true };
		case A.EDITING_PASSWORD:
			return { ...state, incorrect_password: false };
	}
	return state;
}
export default homeReducer;