import React from 'react';
import Button from '../Button/Button';

const loginStyle = {
	display: 'flex',
	flexDirection: 'row',
};

const HeaderLogin = () => (
	<nav style={loginStyle}>
		<p>Rika</p>
		<Button {...{ buttonText: 'Logout' }} />
	</nav>
);

export default HeaderLogin;
