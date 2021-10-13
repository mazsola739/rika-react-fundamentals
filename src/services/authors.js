import { getApiService } from './apiService';

export const createService = (resource) => {
	const apiService = getApiService(resource);

	return {
		save: (entity) => apiService.post(`/add`, entity),
		getAll: () => apiService.get('/all'),
	};
};
