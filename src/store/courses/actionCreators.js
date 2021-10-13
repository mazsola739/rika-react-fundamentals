import {
	deleteCourseThunk,
	fetchCoursesThunk,
	saveCourseThunk,
	updateCourseThunk,
} from './thunk';

export const saveCourse = (newCourse) => saveCourseThunk(newCourse);
export const deleteCourse = (id) => deleteCourseThunk(id);
export const updateCourse = (newCourse) => updateCourseThunk(newCourse);
export const fetchCourses = (courses) => fetchCoursesThunk(courses);
