import React from 'react';

const buttonStyle = {
	width: '150px',
};

const Button = ({ buttonText, handleClick, id }) => {
	return (
		<button
			style={buttonStyle}
			className='btn btn-sm border border-info border-2 rounded-1'
			onClick={handleClick}
			id={id}
		>
			{buttonText}
		</button>
	);
};

export default Button;
