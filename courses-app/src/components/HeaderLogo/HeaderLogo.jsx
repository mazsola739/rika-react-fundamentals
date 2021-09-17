import React from 'react';
import logo from '../../resources/images/logo.jpg';

const logoStyle = {
	display: 'flex',
	flexDirection: 'row',
};

const HeaderLogo = () => (
	<div style={logoStyle}>
		<img src={logo} alt='courses-logo.jpg' />
		<h3>Courses</h3>
	</div>
);

export default HeaderLogo;
