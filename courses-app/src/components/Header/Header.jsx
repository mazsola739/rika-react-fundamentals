import React from 'react';
import HeaderLogo from '../HeaderLogo/HeaderLogo';
import HeaderLogin from '../HeaderLogin/HeaderLogin';

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
			<HeaderLogo />
		</div>
		<div>
			<HeaderLogin />
		</div>
	</header>
);

export default Header;
