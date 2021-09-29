import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import logo from '../../images/logo.jpg';
import { Redirect } from 'react-router-dom';

const imgStyle = {
	width: '50px',
	height: '50px',
};

const Header = ({ user, isLogged, setIsLogged }) => {
	return (
		<div className='border border-danger border-2 rounded-1'>
			<div className='row'>
				<div className='col-sm-8'>
					<img style={imgStyle} src={logo} alt='courses-logo.jpg' />
					<span>Courses</span>
				</div>
				{isLogged ? (
					<Logout username={user.user.name} setIsLogged={setIsLogged} />
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

const Logout = ({ username }) => {
	return (
		<div className='row col-sm-4 align-items-center'>
			<div className='col-sm-2'>{username}</div>
			<div className='col-sm-2'>
				<Button
					buttonText='Logout'
					buttonClickHandler={() => {
						localStorage.removeItem('token');
						setIsLogged(false);
						<Redirect to='/' />;
					}}
				/>
			</div>
		</div>
	);
};

Header.propTypes = {
	username: PropTypes.any,
	logo: PropTypes.any,
	imgStyle: PropTypes.any,
};

export default Header;
