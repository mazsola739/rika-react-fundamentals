import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

import Input from 'common/Input/Input';
import Button from 'common/Button/Button';
import { registerThunk } from 'store/user/thunk';

const Registration = () => {
	const [newUser, setNewUser] = useState(false);

	const formOnSubmit = (e) => {
		e.preventDefault();
		const form = new FormData(e.target);
		const userData = {
			name: form.get('name'),
			email: form.get('email'),
			password: form.get('password'),
		};
		registerThunk(userData, setNewUser);
	};

	if (newUser === true) {
		return <Redirect to='/login' />;
	}

	return (
		<div className='border border-dark border-1 rounded-1 p-3 my-3'>
			<div className='d-flex justify-content-center'>
				<form onSubmit={formOnSubmit}>
					<Input
						text='Name'
						placeholderText='Enter name'
						defaultValue={undefined}
						changeHandler={undefined}
						name='name'
					/>
					<Input
						text='Email'
						placeholderText='Enter email'
						defaultValue={undefined}
						changeHandler={undefined}
						name='email'
					/>
					<Input
						text='Password'
						placeholderText='Enter password'
						defaultValue={undefined}
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
					<div className='col btn bg-info rounded-1'>
						If you do have an account you can{' '}
						<Link to='/login'>login &gt;</Link>.
					</div>
				</form>
			</div>
		</div>
	);
};

Registration.propTypes = {
	formOnSubmit: PropTypes.func,
};

export default Registration;
