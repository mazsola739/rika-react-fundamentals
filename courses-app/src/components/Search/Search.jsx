import React from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';

const searchStyle = {
	display: 'flex',
	flexDirection: 'row',
	margin: '20px',
};

const Search = () => {
	return (
		<div style={searchStyle}>
			<Input placeholderText='Enter course name or id...' />
			<Button buttonText='Search' />
		</div>
	);
};

export default Search;
