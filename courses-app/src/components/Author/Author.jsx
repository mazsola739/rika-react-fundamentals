import React from 'react';
import Button from '../Button/Button';

const authorStyle = {
	display: 'flex',
	flexDirection: 'row',
};

const Author = () => (
	<div style={authorStyle}>
		<p>Author name</p>
		<Button buttonText='Add author' />
	</div>
);

export default Author;
