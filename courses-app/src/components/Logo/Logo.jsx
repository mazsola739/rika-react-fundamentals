import React from 'react';
import logo from './logo.jpg';

const logoStyle = {
	display: 'flex',
	flexDirection: 'row',
};

const Logo = () => (
	<div style={logoStyle}>
		<img src={logo} alt='courses-logo.jpg' />
		<p>Courses</p>
	</div>
);

export default Logo;
