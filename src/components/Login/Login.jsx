import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import axios from 'axios';

import Input from '../Input/Input';
import Button from '../Button/Button';
import { userLogin } from 'store/user/actionCreators';

const apiService = axios.create({
	baseURL: 'http://localhost:3000',
	headers: { 'Content-type': 'application/json' },
});

const fetchData = async (userData) => {
	const { data: answer } = await apiService.post('/login', userData);
	localStorage.setItem('token', answer.result);
	return answer;
};

const Login = ({ user }) => {
	const dispatch = useDispatch();
	const formOnSubmit = async (e) => {
		e.preventDefault();

		const form = new FormData(e.target);
		const userData = JSON.stringify({
			email: form.get('email'),
			password: form.get('password'),
		});
		const response = await fetchData(userData);
		dispatch(userLogin({ ...response.user, token: response.result }));
	};

	if (user.isAuth) {
		return <Redirect to='/courses' />;
	}

	return (
		<div className='border border-dark border-1 rounded-1 p-3 my-3'>
			<div className='d-flex justify-content-center'>
				<form onSubmit={formOnSubmit}>
					<Input
						text='Email'
						placeholderText='Enter email'
						changeHandler={undefined}
						value={undefined}
						name='email'
					/>
					<Input
						text='Password'
						placeholderText='Enter password'
						type='password'
						changeHandler={undefined}
						value={undefined}
						name='password'
					/>
					<br />
					<div className='d-flex justify-content-center'>
						<Button text='Login' clickHandler={undefined} icon={undefined} />
					</div>

					<br />

					<span>
						If you not have an account you can register:{' '}
						<Link to='/registration'>Registration &gt;</Link>
					</span>
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
	formOnSubmit: PropTypes.func,
};

// @ts-ignore
export default connect(({ user }) => ({
	user,
}))(Login);
