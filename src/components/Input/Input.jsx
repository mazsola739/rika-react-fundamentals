import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
	name,
	value,
	changeHandler,
	text,
	placeholderText,
	type = 'text',
}) => {
	return (
		<div className='input-group mb-3'>
			<div className='bg-info bg-opacity-25 input-group-text col-form-label-sm border-end-0 border-1 border-dark rounded-end-1'>
				{text}
			</div>
			<input
				name={name}
				value={value}
				onChange={changeHandler}
				type={type}
				className='form-control col-form-label-sm border-start-0 border-1 border-dark rounded-start-1'
				placeholder={placeholderText}
			/>
		</div>
	);
};

Input.propTypes = {
	name: PropTypes.string,
	value: PropTypes.string,
	changeHandler: PropTypes.func,
	text: PropTypes.string,
	placeholderText: PropTypes.string,
};

export default Input;
