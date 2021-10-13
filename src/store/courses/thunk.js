import { createService } from 'services/courses';
import {
	deleteCourse,
	fetchCourses,
	saveCourse,
	updateCourse,
} from 'store/courses/actionCreators';

const courseService = createService('/courses');

export const fetchCoursesThunk = async (dispatch) => {
	await courseService
		.getAll()
		.then((response) => response.data)
		.then((myJson) => dispatch(fetchCourses(myJson.result)));
};

export const saveCourseThunk = async (dispatch, newCourse) => {
	await courseService.save(newCourse);
	await dispatch(saveCourse({ newCourse }));
};

export const deleteCourseThunk = async (id, dispatch) => {
	await courseService.delete(id);
	await dispatch(deleteCourse(id));
};

export const updateCourseThunk = async (dispatch, newCourse) => {
	await courseService.update(newCourse.id);
	await dispatch(updateCourse(newCourse));
};
