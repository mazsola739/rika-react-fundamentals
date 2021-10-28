import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

import { Button, Input } from 'common';
import { registerThunk } from 'store/user/thunk';
import {
	EMAIL,
	EMAIL_PLACEHOLDER,
	LOGIN_,
	NAME,
	NAME_PLACEHOLDER,
	PASSWORD,
	PASSWORD_PLACEHOLDER,
	REGISTRATION,
	REGISTRATION_PAGE,
} from '../../utils/constants';

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
						text={NAME}
						placeholderText={NAME_PLACEHOLDER}
						defaultValue={undefined}
						changeHandler={undefined}
						name='name'
					/>
					<Input
						text={EMAIL}
						placeholderText={EMAIL_PLACEHOLDER}
						defaultValue={undefined}
						changeHandler={undefined}
						name='email'
					/>
					<Input
						text={PASSWORD}
						placeholderText={PASSWORD_PLACEHOLDER}
						defaultValue={undefined}
						changeHandler={undefined}
						name='password'
						type='password'
					/>

					<br />
					<div className='d-flex justify-content-center'>
						<Button
							text={REGISTRATION}
							clickHandler={undefined}
							icon={undefined}
						/>
					</div>
					<br />
					<div className='col btn bg-info rounded-1'>
						{REGISTRATION_PAGE} <Link to='/login'>{LOGIN_}</Link>.
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
