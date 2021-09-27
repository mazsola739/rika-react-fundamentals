import React from 'react';
import Input from '../Input/Input';

const Form = ({
	reason,
	labelText,
	placeholderText,
	type = 'text',
	value,
	changeHandler,
}) => {
	return (
		<form>
			<label htmlFor={reason} placeholder={placeholderText}>
				{labelText}
			</label>
			<br />
			<Input
				type={type}
				inputId={undefined}
				placeholderText={undefined}
				changeHandler={undefined}
				value={value}
			/>
			<br />
		</form>
	);
};

export default Form;
