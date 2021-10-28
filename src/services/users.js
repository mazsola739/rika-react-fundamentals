import { getApiService } from './apiService';

const getToken = () => localStorage.getItem('token');

export const createService = (resource) => {
	let apiService = getApiService(resource);

	return {
		register: async (userData) => {
			const { data: answer } = await apiService.post(`/register`, userData);
			return answer;
		},
		login: async (userData) => {
			const { data: answer } = await apiService.post(`/login`, userData);
			localStorage.setItem('token', answer.result);
			const { data: userRole } = await apiService.get('/users/me', {
				headers: { Authorization: getToken() },
			});
			apiService = getApiService(resource, answer.result);
			answer.user.role = userRole.result.role;
			return answer;
		},
		logout: async () =>
			apiService.delete('/logout', {
				headers: { Authorization: getToken() },
			}),
	};
};
