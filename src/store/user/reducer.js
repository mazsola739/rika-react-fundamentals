import { USER_LOGIN, USER_LOGOUT } from './actionTypes';

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

export default function user(state = userInitialState, { type, payload }) {
	switch (type) {
		case USER_LOGIN:
			return {
				isAuth: true,
				...payload,
			};
		case USER_LOGOUT:
			return userInitialState;

		default:
			return state;
	}
}
