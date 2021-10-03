import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/*const inputStyle = {
	width: '90%',
};*/

const Input = (
	{ name, value, changeHandler, text, placeholderText, type = 'text' },
	ref
) => {
	return (
		<div className='input-group mb-3'>
			<div className='bg-info bg-opacity-25 input-group-text col-form-label-sm border-end-0 border-1 border-dark rounded-end-1'>
				{text}
			</div>
			<input
				name={name}
				value={value}
				onChange={changeHandler}
				ref={ref}
				type={type}
				className='form-control col-form-label-sm border-start-0 border-1 border-dark rounded-start-1'
				placeholder={placeholderText}
			/>
		</div>
	);
};

const forwardedRef = forwardRef(Input);

forwardedRef.propTypes = {
	name: PropTypes.string,
	value: PropTypes.string,
	changeHandler: PropTypes.func,
	text: PropTypes.string,
	placeholderText: PropTypes.string,
	ref: PropTypes.any,
};

export default forwardedRef;
