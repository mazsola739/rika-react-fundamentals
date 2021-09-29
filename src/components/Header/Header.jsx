import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import logo from '../../images/logo.jpg';
import { Link } from 'react-router-dom';

const imgStyle = {
	width: '50px',
	height: '50px',
};

const Header = ({ user, isLogged, setIsLogged }) => {
	setIsLogged(user.successful === true ? true : false);
	return (
		<div className='border border-danger border-2 rounded-1'>
			<div className='row'>
				<div className='col-sm-8'>
					<img style={imgStyle} src={logo} alt='courses-logo.jpg' />
					<span>Courses</span>
				</div>
				{isLogged ? (
					<div className='row col-sm-4 align-items-center'>
						<div className='col-sm-2'>{user.user.name}</div>
						<div className='col-sm-2'>
							<Link to='/login'>
								<Button
									buttonText='Logout'
									buttonClickHandler={() => {
										localStorage.removeItem('token');
										setIsLogged(false);
									}}
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
