import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
	buttonText,
	buttonClickHandler,
	icon,
	size = { width: '150px' },
}) => {
	return (
		<button
			style={size}
			className='bg-info bg-opacity-25 btn border border-info border-2 rounded-1'
			onClick={buttonClickHandler}
		>
			{buttonText}
			<i className={icon} style={{ fontSize: '16px' }} />
		</button>
	);
};

Button.propTypes = {
	buttonClickHandler: PropTypes.func,
	buttonText: PropTypes.string,
};

export default Button;
