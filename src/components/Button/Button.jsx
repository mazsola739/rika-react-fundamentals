import React from 'react';
import PropTypes from 'prop-types';

const buttonStyle = {
	width: '150px',
};

const Button = ({ buttonText, buttonClickHandler }) => {
	return (
		<button
			style={buttonStyle}
			className='btn btn-sm border border-info border-2 rounded-1'
			onClick={buttonClickHandler}
		>
			{buttonText}
		</button>
	);
};

Button.propTypes = {
	buttonStyle: PropTypes.any,
	buttonClickHandler: PropTypes.any,
	buttonText: PropTypes.any,
};

export default Button;
