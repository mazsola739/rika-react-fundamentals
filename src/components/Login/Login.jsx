import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

import { Button, Input } from 'common';
import { loginThunk } from 'store/user/thunk';
import {
	EMAIL,
	EMAIL_PLACEHOLDER,
	LOGIN,
	LOGIN_PAGE,
	PASSWORD,
	PASSWORD_PLACEHOLDER,
	REGISTRATION_,
} from '../../utils/constants';

const Login = ({ user }) => {
	const dispatch = useDispatch();

	const formOnSubmit = async (e) => {
		e.preventDefault();

		const form = new FormData(e.target);
		const userData = JSON.stringify({
			email: form.get('email'),
			password: form.get('password'),
		});
		loginThunk(userData, dispatch);
	};

	if (user.isAuth) {
		return <Redirect to='/courses' />;
	}

	return (
		<div className='border border-dark border-1 rounded-1 p-3 my-3'>
			<div className='d-flex justify-content-center'>
				<form onSubmit={formOnSubmit}>
					<Input
						text={EMAIL}
						placeholderText={EMAIL_PLACEHOLDER}
						changeHandler={undefined}
						defaultValue={undefined}
						name='email'
					/>
					<Input
						text={PASSWORD}
						placeholderText={PASSWORD_PLACEHOLDER}
						type='password'
						changeHandler={undefined}
						defaultValue={undefined}
						name='password'
					/>
					<br />
					<div className='d-flex justify-content-center'>
						<Button text={LOGIN} clickHandler={undefined} icon={undefined} />
					</div>

					<br />

					<div className='col btn bg-info rounded-1'>
						{LOGIN_PAGE} <Link to='/registration'>{REGISTRATION_}</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

Login.propTypes = {
	user: PropTypes.shape({
		isAuth: PropTypes.bool,
		name: PropTypes.string,
		email: PropTypes.string,
		token: PropTypes.string,
	}),
};

// @ts-ignore
export default connect(({ user }) => ({
	user,
}))(Login);
