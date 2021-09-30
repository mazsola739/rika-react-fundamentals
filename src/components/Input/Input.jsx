import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/*const inputStyle = {
	width: '90%',
};*/

const Input = (
	{
		inputName,
		inputValue,
		changeHandler,
		labelText,
		placeholderText,
		inputType = 'text',
		inputId,
	},
	inputRef
) => {
	return (
		<div className='input-group mb-3'>
			<div className='bg-warning bg-opacity-25 input-group-text col-form-label-sm border-end-0 border-2 border-warning rounded-end-1'>
				{labelText}
			</div>
			<input
				id={inputId}
				name={inputName}
				value={inputValue}
				onChange={changeHandler}
				ref={inputRef}
				type={inputType}
				className='bg-warning bg-opacity-10 form-control col-form-label-sm border-start-0 border-2 border-warning rounded-start-1'
				placeholder={placeholderText}
			/>
		</div>
	);
};

const forwardedRef = forwardRef(Input);

forwardedRef.propTypes = {
	inputType: PropTypes.any,
};

export default forwardedRef;
