import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Input = (
	{ name, defaultValue, changeHandler, text, placeholderText, type = 'text' },
	ref
) => {
	return (
		<div className='input-group mb-3'>
			<div className='bg-info bg-opacity-25 input-group-text col-form-label-sm border-end-0 border-1 border-dark rounded-end-1'>
				{text}
			</div>
			<input
				ref={ref}
				name={name}
				defaultValue={defaultValue}
				onChange={changeHandler}
				type={type}
				className='form-control col-form-label-sm border-start-0 border-1 border-dark rounded-start-1'
				placeholder={placeholderText}
			/>
		</div>
	);
};

const ForwardInput = forwardRef(Input);

ForwardInput.propTypes = {
	name: PropTypes.string,
	defaultValue: PropTypes.string,
	changeHandler: PropTypes.func,
	text: PropTypes.string,
	placeholderText: PropTypes.string,
};

export default ForwardInput;
