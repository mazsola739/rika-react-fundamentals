import { getApiService } from './apiService';

export const saveNewCourse = (newCourse) =>
	getApiService().post('/courses/add', newCourse);

export const deleteThisCourse = (id) =>
	getApiService().delete(`/courses/${id}`);
