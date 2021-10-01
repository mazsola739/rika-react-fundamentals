import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

const Header = ({ user, isLogged, setIsLogged }) => {
	const name = user.name;
	return (
		<div className='container bg-danger bg-opacity-10 border border-danger border-2 rounded-1'>
			<div className='row'>
				<div className='col fa fa-laptop' style={{ fontSize: '48px' }}>
					Courses
				</div>

				{isLogged ? (
					<div className='row col-sm-5 d-flex justify-content-end align-items-center'>
						<div className='col bg-danger bg-opacity-25 col rounded-1'>
							{name} rika
						</div>
						<div className='col d-flex justify-content-end'>
							<Link to='/login'>
								<Button
									text='Logout'
									clickHandler={() => {
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
