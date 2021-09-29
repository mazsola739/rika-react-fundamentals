import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import Form from 'components/Form/Form';
import Button from 'components/Button/Button';

const Login = () => {
	const [loginUser, setLoginUser] = useState(false);

	const formOnSubmit = (e) => {
		e.preventDefault();
		const form = new FormData(e.target);
		const userData = JSON.stringify({
			name: '',
			email: form.get('email'),
			password: form.get('password'),
		});

		async function fetchData() {
			const response = await fetch('http://localhost:3000/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: userData,
			});
			const answer = await response.json();
			console.log(answer);
		}

		fetchData();
	};
	if (loginUser === true) {
		return <Redirect to='/courses' />;
	}
	return (
		<div className='border border-primary border-2 rounded-1 p-3 my-3'>
			<div className='d-flex justify-content-center'>
				<form onSubmit={formOnSubmit}>
					<Form
						labelFor='email'
						labelText='Email'
						inputPlaceholderText='Enter email'
						inputName='email'
					/>
					<Form
						labelFor='password'
						labelText='Password'
						inputPlaceholderText='Enter password'
						inputName='password'
					/>
					<br />
					<div className='d-flex justify-content-center'>
						<Button buttonText='Login' buttonClickHandler={undefined} />
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
