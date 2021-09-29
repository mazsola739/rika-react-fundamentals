import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const inputStyle = {
	width: '90%',
};

const Input = (
	{
		inputId,
		inputPlaceholderText,
		inputChangeHandler,
		inputValue,
		inputType = 'text',
		inputName,
	},
	inputRef
) => {
	return (
		<input
			style={inputStyle}
			className='col-form-label-sm border border-2 border-warning rounded-1'
			ref={inputRef}
			type={inputType}
			value={inputValue}
			name={inputName}
			id={inputId}
			placeholder={inputPlaceholderText}
			onChange={inputChangeHandler}
		/>
	);
};

const forwardedRef = forwardRef(Input);

forwardedRef.propTypes = {
	inputName: PropTypes.any,
	inputType: PropTypes.any,
	inputValue: PropTypes.any,
	inputId: PropTypes.any,
	inputPlaceholderText: PropTypes.any,
	inputChangeHandler: PropTypes.any,
};

export default forwardedRef;
