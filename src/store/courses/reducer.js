import {
	SAVE_COURSE,
	DELETE_COURSE,
	UPDATE_COURSE,
	FETCH_COURSES,
} from './actionTypes';

const coursesInitialState = [];

export default function courses(
	state = coursesInitialState,
	{ type, payload }
) {
	switch (type) {
		case SAVE_COURSE:
			return [...state, payload];
		case DELETE_COURSE:
			return state.filter((course) => course.id !== payload);
		case UPDATE_COURSE:
			return state.map((course) =>
				course.id === payload.id ? payload : course
			);
		case FETCH_COURSES:
			return payload;
		default:
			return state;
	}
}
