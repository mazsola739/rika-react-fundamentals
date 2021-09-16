import React from 'react';
import Button from '../Button/Button';

const authorStyle = {
	display: 'flex',
	flexDirection: 'row',
};

const Author = () => (
	<div style={authorStyle}>
		<p>Someone Important</p>
		<Button />
	</div>
);

export default Author;
