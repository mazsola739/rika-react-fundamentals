import React from 'react';

const inputStyle = {
	width: '90%',
};

const Input = ({ inputId, placeholderText }) => {
	return (
		<input
			style={inputStyle}
			className='col-form-label-sm border border-2 border-warning rounded-1'
			id={inputId}
			placeholder={placeholderText}
		/>
	);
};

export default Input;
