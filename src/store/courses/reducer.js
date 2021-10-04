import {
	SAVE_COURSE,
	DELETE_COURSE,
	EDIT_COURSE,
	FETCH_COURSES,
} from './actionTypes';

const coursesInitialState = [];

export default function courses(
	state = coursesInitialState,
	{ type, payload }
) {
	switch (type) {
		case SAVE_COURSE:
			return state.concat(payload);
		case DELETE_COURSE:
			return state.filter((course) => course.id !== payload);
		case EDIT_COURSE:
			return coursesInitialState;
		case FETCH_COURSES:
			return payload;
		default:
			return state;
	}
}
