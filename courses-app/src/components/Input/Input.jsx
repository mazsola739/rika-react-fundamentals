import React from 'react';

const inputStyle = {
	border: 'peru solid 2px',
	margin: 'auto',
	height: '25px',
	minWidth: '250px',
};

const Input = () => (
	<input style={inputStyle} placeholder='Enter lore ipsum...'></input>
);

export default Input;
