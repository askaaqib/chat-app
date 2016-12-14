import * as A from './actions';
const initialState = {
	created_room: false,
	creating_room: false, 
	authenticating_room: false,
	authenticated_room: true,
	username: undefined
}

const homeReducer = (state = initialState, action) => {
	switch (action.type) {
		case A.CREATING_ROOM: 
			return { ...state, creating_room: true };
		case A.CREATED_ROOM: 
			return { ...state, creating_room: false, created_room: true };
		case A.AUTHENTICATING_ROOM: 
			return { ...state, authenticating_room: true };
		case A.AUTHENTICATED_ROOM: 
			return { ...state, authenticated_room: true , authenticating_room: false };
		case A.SET_USERNAME: 
			return { ...state, username: action.payload };
	}
	return state;
}
export default homeReducer;