import React from 'react';
import Button from '../Button/Button';
import Search from '../Search/Search';

const sectionStyle = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
};

const SearchSection = () => {
	const handleClick = () => console.log('Im Batman');
	return (
		<div style={sectionStyle}>
			<div>
				<Search />
			</div>
			<div>
				<Button {...{ buttonText: 'Add new course', handleClick }} />
			</div>
		</div>
	);
};

export default SearchSection;
