import { getApiService } from './apiService';

export const register = async (userData) => {
	const { data: answer } = await getApiService().post('/register', userData);
	return answer;
};

export const login = async (userData) => {
	const { data: answer } = await getApiService().post('/login', userData);
	localStorage.setItem('token', answer.result);
	return answer;
};

export const logout = () => {
	getApiService().delete('/logout');
	localStorage.removeItem('token');
};
