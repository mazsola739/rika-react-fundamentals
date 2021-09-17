import React from 'react';
import Button from '../Button/Button';

const authorStyle = {
	display: 'flex',
	flexDirection: 'row',
};

const Author = ({ authorName, id, buttonText }) => (
	<div id={id} style={authorStyle}>
		<p>{authorName}</p>
		<Button buttonText={buttonText} />
	</div>
);

export default Author;
