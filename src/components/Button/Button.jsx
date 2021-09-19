import React from 'react';

const buttonStyle = {
	width: '150px',
};

/*function FancyButton(props) {
	return (
	  <button className="FancyButton">
		{props.children}
	  </button>
	);
  }*/

const Button = ({ buttonText, handleClick }) => {
	return (
		<button
			style={buttonStyle}
			className='btn btn-sm border border-info border-2 rounded-1'
			onClick={handleClick}
		>
			{buttonText}
		</button>
	);
};

export default Button;
