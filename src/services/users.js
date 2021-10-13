import { getApiService } from './apiService';

export const createService = (resource) => {
	const apiService = getApiService(resource);

	return {
		register: async (userData) => {
			const { data: answer } = await apiService.post(`/register`, userData);
			return answer;
		},
		login: async (userData) => {
			const { data: answer } = await apiService.post(`/login`, userData);
			await localStorage.setItem('token', answer.result);
			return answer;
		},
		logout: async () => {
			await apiService.delete('/logout');
			await localStorage.removeItem('token');
		},
	};
};
