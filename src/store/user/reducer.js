import { USER_LOGIN, USER_LOGOUT } from './actionTypes';

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

export default function userReducer(state = userInitialState, action) {
	switch (action.type) {
		case USER_LOGIN:
			const userData = action.userData;

			return {
				isAuth: true,
				name: userData.user.name,
				email: userData.user.email,
				token: userData.result,
			};
		case USER_LOGOUT:
			return userInitialState;

		default:
			return state;
	}
}
