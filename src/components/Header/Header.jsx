import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { Redirect } from 'react-router-dom';

const Header = ({ user }) => {
	console.log(user.isAuth);

	return (
		<div className='container bg-danger bg-opacity-10 border border-danger border-2 rounded-1'>
			<div className='row'>
				<div className='col fa fa-laptop' style={{ fontSize: '42px	' }}>
					Courses
				</div>
				{user.isAuth ? (
					<div className='row col-sm-5 d-flex justify-content-end align-items-center'>
						<div className='col bg-danger bg-opacity-25 col rounded-1'>
							{user.name}
						</div>
						<div className='col d-flex justify-content-end'>
							<Button
								text='Logout'
								clickHandler={() => {
									localStorage.removeItem('token');
									<Redirect to='/login' />;
								}}
								icon={undefined}
							/>
						</div>
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

Header.propTypes = {
	username: PropTypes.string,
};

export default Header;
