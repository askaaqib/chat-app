import * as A from './actions';
const initialState = {
	room: {},
	events: []
}

const chatReducer = (state = initialState, action) => {
	switch (action.type) {
		case A.NEW_EVENT: 
			return { ...state, events: state.events.concat([action.payload])};
		case A.SET_ROOM: 
			return { ...state, room: action.payload };
		case A.LEAVE_ROOM:
			return { ...initialState }
	}
	return state;
}
export default chatReducer;
