import React from 'react';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

const headerStyle = {
	border: 'red solid 2px',
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	margin: '20px',
};

const Header = () => (
	<header style={headerStyle}>
		<div>
			<Logo />
		</div>
		<div>
			<Navigation />
		</div>
	</header>
);

export default Header;
