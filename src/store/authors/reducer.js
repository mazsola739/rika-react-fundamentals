import { SAVE_AUTHOR, DELETE_AUTHOR, FETCH_AUTHORS } from './actionTypes';

const authorsInitialState = [];

export default function authors(
	state = authorsInitialState,
	{ type, payload }
) {
	switch (type) {
		case SAVE_AUTHOR:
			return {
				...state,
				authors: [...state, { ...payload }],
			};
		case DELETE_AUTHOR:
			return authorsInitialState;
		case FETCH_AUTHORS:
			return payload.result;
		default:
			return state;
	}
}
