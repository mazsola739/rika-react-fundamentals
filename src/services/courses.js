import { getApiService } from './apiService';

export const createService = (resource) => {
	const apiService = getApiService(resource);

	return {
		save: (entity) => apiService.post(`/add`, entity),
		update: (id) => apiService.put(id),
		delete: (id) => apiService.delete(id),
		getAll: () => apiService.get('/all'),
	};
};
