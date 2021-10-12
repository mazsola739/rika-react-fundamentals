import { login, logout, register, userRole } from 'services/users';
import { userLogin, userLogout } from './actionCreators';

export const loginThunk = async (userData, dispatch) => {
	const response = await login(userData);
	userRole();
	dispatch(userLogin({ ...response.user, token: response.result }));
};

export const logoutThunk = (dispatch) => {
	logout();
	dispatch(userLogout());
};

export const registerThunk = (userData, setNewUser) => {
	register(userData).then((response) => setNewUser(response.successful));
};
