import React from 'react';

const inputStyle = {
	border: 'peru solid 2px',
	margin: 'auto',
	paddingLeft: '10px',
	height: '24px',
	minWidth: '350px',
};

const Input = ({ inputId, placeholderText }) => (
	<input id={inputId} style={inputStyle} placeholder={placeholderText}></input>
);

export default Input;
