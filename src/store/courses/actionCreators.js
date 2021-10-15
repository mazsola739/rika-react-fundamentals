import {
	deleteCourseThunk,
	getCoursesThunk,
	addCourseThunk,
	updateCourseThunk,
} from './thunk';

export const addCourse = (newCourse) => addCourseThunk(newCourse);
export const deleteCourse = (id) => deleteCourseThunk(id);
export const updateCourse = (newCourse) => updateCourseThunk(newCourse);
export const getCourses = () => getCoursesThunk();
