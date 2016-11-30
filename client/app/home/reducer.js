import * as A from './actions';
const initialState = {
	created_room: false,
	creating_room: false, 
	joined_room: false, 
	joining_room: false,
}

const homeReducer = (state = initialState, action) => {
	switch (action.type) {
		case A.CREATED_ROOM: 
			return { ...state, creating_room: false, created_room: true };
		case A.JOINED_ROOM: 
			return { ...state, joining_room: false, joined_room: true };
		case A.CREATING_ROOM: 
			return { ...state, creating_room: true };
		case A.JOINING_ROOM: 
			return { ...state, joining_room: true };
	}
	return state;
}
export default homeReducer;