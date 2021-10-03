import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ size = { width: '150px' }, clickHandler, text, icon }) => {
	return (
		<button
			className='bg-info bg-opacity-50 btn border-info border-1 rounded-1'
			style={size}
			onClick={clickHandler}
		>
			{text}
			<i className={icon} style={{ fontSize: '16px' }} />
		</button>
	);
};

Button.propTypes = {
	size: PropTypes.object,
	clickHandler: PropTypes.func,
	text: PropTypes.string,
	icon: PropTypes.string,
};

export default Button;
