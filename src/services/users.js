import { getApiService } from './apiService';

export const createService = (resource) => {
	localStorage.getItem('token');
	let apiService = getApiService(resource);

	return {
		register: async (userData) => {
			const { data: answer } = await apiService.post(`/register`, userData);
			return answer;
		},
		login: async (userData) => {
			const { data: answer } = await apiService.post(`/login`, userData);
			localStorage.setItem('token', answer.result);
			apiService = getApiService(resource, answer.result);
			return answer;
		},
		logout: async () => apiService.delete('/logout'),
	};
};
