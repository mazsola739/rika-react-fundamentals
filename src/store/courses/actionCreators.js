import {
	SAVE_COURSE,
	DELETE_COURSE,
	EDIT_COURSE,
	FETCH_COURSES,
	FILTER_COURSES,
} from './actionTypes';

export const saveCourse = ({ newCourse }) => ({
	type: SAVE_COURSE,
	payload: [newCourse],
});
export const deleteCourse = (thisCourse) => ({
	type: DELETE_COURSE,
	payload: thisCourse,
});
export const editCourse = (courses) => ({
	type: EDIT_COURSE,
	courses,
});
export const fetchCourses = (courses) => ({
	type: FETCH_COURSES,
	payload: courses,
});
export const filterCourses = (courses) => ({
	type: FILTER_COURSES,
	payload: courses,
});
