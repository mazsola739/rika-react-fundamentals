import {
	SAVE_COURSE,
	DELETE_COURSE,
	EDIT_COURSE,
	GET_COURSE,
} from './actionTypes';

const coursesInitialState = {
	courses: [],
};

export default function courseReducer(state = coursesInitialState, action) {
	switch (action.type) {
		case SAVE_COURSE:
			return coursesInitialState;
		case DELETE_COURSE:
			return coursesInitialState;
		case EDIT_COURSE:
			return coursesInitialState;
		case GET_COURSE:
			return coursesInitialState;
		default:
			return state;
	}
}
