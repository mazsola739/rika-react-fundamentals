import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

const Header = ({ user, isLogged, setIsLogged }) => {
	return (
		<div className='bg-danger bg-opacity-10 border border-danger border-2 rounded-1'>
			<div className='row'>
				<div className='col fa fa-laptop' style={{ fontSize: '48px' }}>
					Courses
				</div>

				{isLogged ? (
					<div className='row col-sm-4 align-items-center'>
						<div className='bg-danger bg-opacity-25 col-sm-2 rounded-1'>
							{user.user.name}
						</div>
						<div className='col-sm-2'>
							<Link to='/login'>
								<Button
									buttonText='Logout'
									buttonClickHandler={() => {
										localStorage.removeItem('token');
										setIsLogged(false);
									}}
									icon={undefined}
								/>
							</Link>
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
