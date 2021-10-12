import { getApiService } from 'services/apiService';
import { createService } from 'services/courses';
import {
	deleteCourse,
	fetchCourses,
	saveCourse,
} from 'store/courses/actionCreators';

export const fetchCoursesThunk = (dispatch) => {
	getApiService()
		.get(`/courses/all`)
		.then((response) => response.data)
		.then((myJson) => dispatch(fetchCourses(myJson.result)));
};

export const saveCourseThunk = (newCourse, dispatch) => {
	createService(newCourse);
	dispatch(saveCourse({ newCourse }));
};

export const deleteCourseThunk = (id, dispatch) => {
	createService(id);
	dispatch(deleteCourse(id));
};
