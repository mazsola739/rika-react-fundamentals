import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input/Input';

const Form = ({ labelFor, labelText, inputPlaceholderText, inputName }) => {
	return (
		<>
			<label htmlFor={labelFor}>{labelText}</label>
			<br />
			<Input
				inputId={undefined}
				inputPlaceholderText={inputPlaceholderText}
				inputChangeHandler={undefined}
				inputValue={undefined}
				inputName={inputName}
			/>
			<br />
		</>
	);
};

Form.propTypes = {
	labelFor: PropTypes.any,
	labelText: PropTypes.any,
	inputPlaceholderText: PropTypes.any,
	inputName: PropTypes.any,
};

export default Form;
