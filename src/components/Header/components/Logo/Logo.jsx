import { COURSES } from '../../../../constants';
import React from 'react';

const Logo = () => {
	return (
		<div
			data-testid='logo'
			className='col fa fa-laptop'
			style={{ fontSize: '48px' }}
		>
			{COURSES}
		</div>
	);
};

export default Logo;
