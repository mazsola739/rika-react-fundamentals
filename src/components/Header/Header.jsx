import React from 'react';
import Button from '../Button/Button';
import logo from '../../images/logo.jpg';
import { Link } from 'react-router-dom';

const imgStyle = {
	width: '50px',
	height: '50px',
};

const Header = () => {
	return (
		<div className='border border-danger border-2 rounded-1'>
			<div className='row'>
				<div className='col-sm-8'>
					<img style={imgStyle} src={logo} alt='courses-logo.jpg' />
					<span>Courses</span>
				</div>
				<Logout />
			</div>
		</div>
	);
};

const Logout = () => {
	return (
		<div className='row col-sm-4 align-items-center'>
			<div className='col-sm-2'>Rika</div>
			<div className='col-sm-2'>
				<Link to='/'>
					<Button buttonText='Logout' handleClick={undefined} id={undefined} />
				</Link>
			</div>
		</div>
	);
};

export default Header;
