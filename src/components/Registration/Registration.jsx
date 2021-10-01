import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

import Input from '../Input/Input';
import Button from 'components/Button/Button';

/*const apiService = axios.create({
	baseURL: 'http://localhost:3000',
	headers: { 'Content-type': 'application/json' },
});

const fetchData = async (userData) => {
	const { data: answer } = await apiService.post('/login', userData);
	localStorage.setItem('token', answer.result);
	return answer;
};*/

const Registration = () => {
	const [newUser, setNewUser] = useState(false);

	const formOnSubmit = (e) => {
		e.preventDefault();
		const form = new FormData(e.target);
		const userData = JSON.stringify({
			name: form.get('name'),
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
			setNewUser(answer.successful);
		}
		fetchData();
	};
	if (newUser === true) {
		return <Redirect to='/login' />;
	}

	return (
		<div className='bg-primary bg-opacity-10 border border-primary border-2 rounded-1 p-3 my-3'>
			<div className='d-flex justify-content-center'>
				<form onSubmit={formOnSubmit}>
					<Input
						text='Name'
						placeholderText='Enter name'
						value={undefined}
						changeHandler={undefined}
						name='name'
					/>
					<Input
						text='Email'
						placeholderText='Enter email'
						value={undefined}
						changeHandler={undefined}
						name='email'
					/>
					<Input
						text='Password'
						placeholderText='Enter password'
						value={undefined}
						changeHandler={undefined}
						name='password'
						type='password'
					/>

					<br />
					<div className='d-flex justify-content-center'>
						<Button
							text='Registration'
							clickHandler={undefined}
							icon={undefined}
						/>
					</div>
					<br />
					<span>
						If you do have an account you can{' '}
						<Link to='/login'>login &gt;</Link>.
					</span>
				</form>
			</div>
		</div>
	);
};

Registration.propTypes = {
	formOnSubmit: PropTypes.any,
};

export default Registration;
