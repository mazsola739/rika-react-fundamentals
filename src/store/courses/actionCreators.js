import {
	SAVE_COURSE,
	DELETE_COURSE,
	UPDATE_COURSE,
	FETCH_COURSES,
} from './actionTypes';

export const saveCourse = ({ newCourse }) => ({
	type: SAVE_COURSE,
	payload: newCourse,
});
export const deleteCourse = (id) => ({
	type: DELETE_COURSE,
	payload: id,
});
export const updateCourse = (newCourse) => ({
	type: UPDATE_COURSE,
	payload: newCourse,
});
export const fetchCourses = (courses) => ({
	type: FETCH_COURSES,
	payload: courses,
});
