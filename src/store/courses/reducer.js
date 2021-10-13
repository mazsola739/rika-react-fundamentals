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
			state.forEach((course, index) => {
				if (course.id === payload.id) state[index] = payload;
			});
			return [
				...state.splice(
					state.findIndex((course) => course.id === payload.id),
					1,
					payload
				),
			];
		case FETCH_COURSES:
			return payload;
		default:
			return state;
	}
}
