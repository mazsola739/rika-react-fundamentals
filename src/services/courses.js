import { getApiService } from './apiService';

const getToken = () => localStorage.getItem('token');

export const createService = (resource) => {
	const apiService = getApiService(resource);

	return {
		add: (entity) =>
			apiService.post(`/add`, entity, {
				headers: { Authorization: getToken() },
			}),
		update: (entity) =>
			apiService.put(`/${entity.id}`, entity, {
				headers: { Authorization: getToken() },
			}),
		delete: (id) =>
			apiService.delete(id, { headers: { Authorization: getToken() } }),
		getAll: () => apiService.get('/all'),
	};
};
