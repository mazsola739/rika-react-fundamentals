import { SAVE_AUTHOR, DELETE_AUTHOR, FETCH_AUTHORS } from './actionTypes';

const authorsInitialState = {
	authors: [],
};

export default function authors(
	state = authorsInitialState,
	{ type, payload }
) {
	switch (type) {
		case SAVE_AUTHOR:
			return state.concat(payload);
		case DELETE_AUTHOR:
			return authorsInitialState;
		case FETCH_AUTHORS:
			return { authors: payload };
		default:
			return state;
	}
}
