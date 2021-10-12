import axios from 'axios';

export const getApiService = (endpoint = '/') => {
	const token = localStorage.getItem('token');
	return axios.create({
		baseURL: `http://localhost:3000${endpoint}`,
		headers: { 'Content-type': 'application/json', Authorization: token },
	});
};
