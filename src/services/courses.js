import { getApiService } from './apiService';

export const createService = (resource) => {
	const apiService = getApiService(resource);

	return {
		save: (entity) => apiService.post(`/add`, entity),
		delete: (id) => apiService.delete(`/`, id),
		getAll: () => apiService.get('/'),
	};
};
