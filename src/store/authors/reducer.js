import { SAVE_AUTHOR, DELETE_AUTHOR, GET_ALL_AUTHORS } from './actionTypes';

const authorsInitialState = [];

export default function authors(
	state = authorsInitialState,
	{ type, payload }
) {
	switch (type) {
		case SAVE_AUTHOR:
			return authorsInitialState;
		case DELETE_AUTHOR:
			return authorsInitialState;
		case GET_ALL_AUTHORS:
			return payload.result;
		default:
			return state;
	}
}
