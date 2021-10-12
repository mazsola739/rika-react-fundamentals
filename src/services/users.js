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
	localStorage.removeItem('role');
	localStorage.removeItem('token');
};

export const userRole = async () => {
	const {
		data: { result: answer },
	} = await getApiService().get('/users/me');
	localStorage.setItem('role', answer.role);
	return answer;
};
