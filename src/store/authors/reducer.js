import { SAVE_AUTHOR, DELETE_AUTHOR, GET_AUTHOR } from './actionTypes';

const authorsInitialState = {
	authors: [],
};

export default function authorReducer(state = authorsInitialState, action) {
	switch (action.type) {
		case SAVE_AUTHOR:
			return authorsInitialState;
		case DELETE_AUTHOR:
			return authorsInitialState;
		case GET_AUTHOR:
			return authorsInitialState;
		default:
			return state;
	}
}
