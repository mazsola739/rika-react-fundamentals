import {
	ADD_COURSE,
	DELETE_COURSE,
	GET_COURSES,
	UPDATE_COURSE,
} from './actionTypes';

const coursesInitialState = [];

const coursesReducer = (state = coursesInitialState, { type, payload }) => {
	switch (type) {
		case ADD_COURSE:
			return [...state, payload];
		case DELETE_COURSE:
			return state.filter((course) => course.id !== payload);
		case UPDATE_COURSE:
			return state.map((course) =>
				course.id === payload.id ? payload : course
			);
		case GET_COURSES:
			return payload;
		default:
			return state;
	}
};

export default coursesReducer;
