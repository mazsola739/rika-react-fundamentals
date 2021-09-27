import React from 'react';
import Form from 'components/Form/Form';
import Button from 'components/Button/Button';
import { Link } from 'react-router-dom';

const centering = {
	margin: 'auto',
};

const Registration = () => {
	return (
		<div
			style={centering}
			className='border border-primary border-2 rounded-1 p-3 my-3'
		>
			<div>
				<Form
					reason={'name'}
					labelText={'Name'}
					placeholderText={'Enter name'}
					type={'text'}
					value={undefined}
					changeHandler={undefined}
				/>
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
				<Link to='/login'>
					<Button
						buttonText={'Registration'}
						handleClick={undefined}
						id={undefined}
					/>
				</Link>
				<br />
				<br />
				<p>
					If you not have an account you can <Link to='/login'>login</Link>
				</p>
			</div>
		</div>
	);
};

export default Registration;
