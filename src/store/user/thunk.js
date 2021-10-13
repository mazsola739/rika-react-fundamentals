import { createService } from 'services/users';
import { userLogin, userLogout } from './actionCreators';

const userService = createService();

export const loginThunk = async (userData, dispatch) => {
	const response = await userService.login(userData);
	await dispatch(userLogin({ ...response.user, token: response.result }));
};

export const logoutThunk = async (dispatch, redirect) => {
	await userService.logout();
	await dispatch(userLogout());
};

export const registerThunk = async (userData, setNewUser) => {
	await userService
		.register(userData)
		.then((response) => setNewUser(response.successful));
};
