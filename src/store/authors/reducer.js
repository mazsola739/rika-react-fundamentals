import { SAVE_AUTHOR, FETCH_AUTHORS } from './actionTypes';

const authorsInitialState = [];

export default function authors(
	state = authorsInitialState,
	{ type, payload }
) {
	switch (type) {
		case SAVE_AUTHOR:
			return [...state, payload];
		case FETCH_AUTHORS:
			return payload;
		default:
			return state;
	}
}
