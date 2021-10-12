import { getApiService } from 'services/apiService';
import { deleteThisCourse, saveNewCourse } from 'services/courses';
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

export const saveCourseThunk = (newCourse, dispatch, setFinished) => {
	saveNewCourse(newCourse);
	dispatch(saveCourse({ newCourse }));
	setFinished(true);
};

export const deleteCourseThunk = (id, dispatch) => {
	deleteThisCourse(id);
	dispatch(deleteCourse(id));
};
