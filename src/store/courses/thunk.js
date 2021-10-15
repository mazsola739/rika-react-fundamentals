import { createService } from 'services/courses';
import {
	DELETE_COURSE,
	ADD_COURSE,
	GET_COURSES,
	UPDATE_COURSE,
} from './actionTypes';

const courseService = createService('/courses');

export const getCoursesThunk = () => async (dispatch) => {
	const courses = await courseService
		.getAll()
		.then((response) => response.data)
		.then(({ result }) => result);

	dispatch({
		type: GET_COURSES,
		payload: courses,
	});
};

export const addCourseThunk = (newCourse) => async (dispatch) => {
	await courseService.add(newCourse);
	dispatch({
		type: ADD_COURSE,
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
