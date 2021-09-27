import React from 'react';
import Form from 'components/Form/Form';
import Button from 'components/Button/Button';
import { Link } from 'react-router-dom';

const centering = {
	margin: 'auto',
};

const Login = () => {
	return (
		<div
			style={centering}
			className='border border-primary border-2 rounded-1 p-3 my-3'
		>
			<div>
				<Form
					reason={'email'}
					labelText={'Email'}
					placeholderText={'Enter email'}
					type={'text'}
					value={undefined}
					changeHandler={undefined}
				/>
				<Form
					reason={'password'}
					labelText={'Password'}
					placeholderText={'Enter password'}
					type={'text'}
					value={undefined}
					changeHandler={undefined}
				/>
				<br />
				<Link to='/courses'>
					<Button buttonText={'Login'} handleClick={undefined} id={undefined} />
				</Link>
				<br />
				<br />
				<p>If you not have an account you can register</p>
				<Link to='/registration'>Registration</Link>
			</div>
		</div>
	);
};

export default Login;
