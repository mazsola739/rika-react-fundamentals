import React from 'react';

const buttonStyle = {
	margin: 'auto 10px',
	verticalAlign: 'middle',
	textAlign: 'center',
	border: 'purple solid 2px',
	background: 'white',
	height: '30px',
	width: '150px',
};

const Button = ({ buttonText, handleClick }) => {
	return (
		<button style={buttonStyle} onClick={handleClick}>
			{buttonText}
		</button>
	);
};

export default Button;
