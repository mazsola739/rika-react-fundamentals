import {
	SAVE_COURSE,
	DELETE_COURSE,
	EDIT_COURSE,
	FETCH_COURSES,
	FILTER_COURSES,
} from './actionTypes';

const coursesInitialState = {
	courses: [],
	allCourses: [],
};

export default function courses(
	state = coursesInitialState,
	{ type, payload }
) {
	switch (type) {
		case SAVE_COURSE:
			return {
				...state,
				courses: state.courses.concat(payload),
			};
		case DELETE_COURSE:
			return {
				...state,
				courses: state.courses.filter((course) => course.id !== payload),
			};
		case EDIT_COURSE:
			return coursesInitialState;
		case FETCH_COURSES:
			return { courses: payload, allCourses: payload };
		case FILTER_COURSES:
			return {
				...state,
				courses: payload,
			};
		default:
			return state;
	}
}
