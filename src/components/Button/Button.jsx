import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, clickHandler, icon, size = { width: '150px' } }) => {
	return (
		<button
			style={size}
			className='bg-info bg-opacity-25 btn border-info border-2 rounded-1'
			onClick={clickHandler}
		>
			{text}
			<i className={icon} style={{ fontSize: '16px' }} />
		</button>
	);
};

Button.propTypes = {
	text: PropTypes.string,
	icon: PropTypes.string,
	clickHandler: PropTypes.any,
};

export default Button;
