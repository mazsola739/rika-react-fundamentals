import React, { forwardRef } from 'react';

const inputStyle = {
	width: '90%',
};

const Input = ({ inputId, placeholderText, changeHandler }, ref) => {
	return (
		<input
			ref={ref}
			style={inputStyle}
			className='col-form-label-sm border border-2 border-warning rounded-1'
			id={inputId}
			placeholder={placeholderText}
			onChange={changeHandler}
		/>
	);
};

const forwardedRef = forwardRef(Input);

export default forwardedRef;
