import {
	SAVE_COURSE,
	DELETE_COURSE,
	EDIT_COURSE,
	GET_ALL_COURSES,
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
export const getAllCourses = (courses) => ({
	type: GET_ALL_COURSES,
	payload: courses,
});
