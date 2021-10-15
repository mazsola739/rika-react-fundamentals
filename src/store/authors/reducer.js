import { ADD_AUTHOR, GET_AUTHORS } from './actionTypes';

const authorsInitialState = [];

const authorsReducer = (state = authorsInitialState, { type, payload }) => {
	switch (type) {
		case ADD_AUTHOR:
			return [...state, payload];
		case GET_AUTHORS:
			return payload;
		default:
			return state;
	}
};
export default authorsReducer;
