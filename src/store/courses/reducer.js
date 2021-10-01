import {
	SAVE_COURSE,
	DELETE_COURSE,
	EDIT_COURSE,
	GET_ALL_COURSES,
} from './actionTypes';

const coursesInitialState = [];

export default function courses(
	state = coursesInitialState,
	{ type, payload }
) {
	switch (type) {
		case SAVE_COURSE:
			return coursesInitialState;
		case DELETE_COURSE:
			return coursesInitialState;
		case EDIT_COURSE:
			return coursesInitialState;
		case GET_ALL_COURSES:
			return payload.result;
		default:
			return state;
	}
}
