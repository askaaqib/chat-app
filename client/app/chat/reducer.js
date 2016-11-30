import * as A from './actions';
const initialState = {
	room: {},
	messages: []
}

const chatReducer = (state = initialState, action) => {
	switch (action.type) {
		case A.NEW_MESSAGE: 
			return { ...state, messages: state.messages.concat([action.payload])};
		case A.SET_ROOM: 
			return { ...state, room: action.payload };
	}
	return state;
}
export default chatReducer;
