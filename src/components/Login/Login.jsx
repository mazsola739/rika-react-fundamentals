import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import Input from '../Input/Input';
import Button from 'components/Button/Button';
import axios from 'axios';

const apiService = axios.create({
	baseURL: 'http://localhost:3000',
	headers: { 'Content-type': 'application/json' },
});

const Login = ({ login, setIsLogged, isLogged }) => {
	const formOnSubmit = (e) => {
		e.preventDefault();
		const form = new FormData(e.target);
		const userData = JSON.stringify({
			email: form.get('email'),
			password: form.get('password'),
		});

		async function fetchData() {
			const { data: answer } = await apiService.post('/login', userData);
			login(answer);
			localStorage.setItem('token', answer.result);
			setIsLogged(answer.successful);
		}

		fetchData();
	};

	if (isLogged === true) {
		return <Redirect to='/courses' />;
	}

	return (
		<div className='bg-primary bg-opacity-10 border border-primary border-2 rounded-1 p-3 my-3'>
			<div className='d-flex justify-content-center'>
				<form onSubmit={formOnSubmit}>
					<Input
						labelText='Email'
						placeholderText='Enter email'
						changeHandler={undefined}
						inputValue={undefined}
						inputName='email'
						inputId={undefined}
					/>
					<Input
						labelText='Password'
						placeholderText='Enter password'
						inputType='password'
						changeHandler={undefined}
						inputValue={undefined}
						inputName='password'
						inputId={undefined}
					/>
					<br />
					<div className='d-flex justify-content-center'>
						<Button
							buttonText='Login'
							buttonClickHandler={undefined}
							icon={undefined}
						/>
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
	formOnSubmit: PropTypes.any,
	userName: PropTypes.any,
};

export default Login;
