import {
	SAVE_COURSE,
	DELETE_COURSE,
	EDIT_COURSE,
	GET_COURSE,
} from './actionTypes';

export const saveCourse = (courseData) => ({
	type: SAVE_COURSE,
	courseData,
});
export const deleteCourse = (courseData) => ({
	type: DELETE_COURSE,
	courseData,
});
export const editCourse = (courseData) => ({
	type: EDIT_COURSE,
	courseData,
});
export const getCourse = (courseData) => ({
	type: GET_COURSE,
	courseData,
});
