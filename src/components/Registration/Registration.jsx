import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import Form from 'components/Form/Form';
import Button from 'components/Button/Button';

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
		//setUserName(`${form.get('name')}`);
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
		<div className='border border-primary border-2 rounded-1 p-3 my-3'>
			<div className='d-flex justify-content-center'>
				<form onSubmit={formOnSubmit}>
					<Form
						labelFor='name'
						labelText='Name'
						inputPlaceholderText='Enter name'
						inputName='name'
					/>
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
						<Button buttonText='Registration' buttonClickHandler={undefined} />
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
