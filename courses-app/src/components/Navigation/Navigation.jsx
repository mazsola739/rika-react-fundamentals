import React from 'react';
import Button from '../Button/Button';

const navigationStyle = {
	display: 'flex',
	flexDirection: 'row',
};

const Navigation = () => (
	<nav style={navigationStyle}>
		<p>Username</p>
		<Button buttonText='Logout' />
	</nav>
);

export default Navigation;
