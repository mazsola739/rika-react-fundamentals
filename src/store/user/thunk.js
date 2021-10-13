import { createService } from 'services/users';
import { USER_LOGIN, USER_LOGOUT } from './actionTypes';

const userService = createService('/');

export const loginThunk = async (userData, dispatch) => {
	const response = await userService.login(userData);
	await dispatch({
		type: USER_LOGIN,
		payload: { ...response.user, token: response.result },
	});
};

export const logoutThunk = () => async (dispatch) => {
	await userService.logout();
	localStorage.removeItem('token');
	dispatch({
		type: USER_LOGOUT,
	});
};

export const registerThunk = async (userData, setNewUser) => {
	await userService
		.register(userData)
		.then((response) => setNewUser(response.successful));
};
