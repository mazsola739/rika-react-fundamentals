import { createService } from 'services/courses';
import {
	DELETE_COURSE,
	FETCH_COURSES,
	SAVE_COURSE,
	UPDATE_COURSE,
} from './actionTypes';

const courseService = createService('/courses');

export const fetchCoursesThunk = async (dispatch) => {
	await courseService
		.getAll()
		.then((response) => response.data)
		.then((myJson) =>
			dispatch({
				type: FETCH_COURSES,
				payload: myJson.result,
			})
		);
};

export const saveCourseThunk = (newCourse) => async (dispatch) => {
	await courseService.save(newCourse);
	dispatch({
		type: SAVE_COURSE,
		payload: newCourse,
	});
};

export const deleteCourseThunk = (id) => async (dispatch) => {
	await courseService.delete(id);
	dispatch({
		type: DELETE_COURSE,
		payload: id,
	});
};

export const updateCourseThunk = (newCourse) => async (dispatch) => {
	await courseService.update(newCourse);
	dispatch({
		type: UPDATE_COURSE,
		payload: newCourse,
	});
};
