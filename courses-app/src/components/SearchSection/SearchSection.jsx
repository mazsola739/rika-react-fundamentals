import React from 'react';
import Button from '../Button/Button';
import Search from '../Search/Search';

const sectionStyle = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
};

const rightStyle = {
	margin: 'auto',
};

const handleClick = () => {
	const x = document.getElementById('createCourses');
	const y = document.getElementById('courses');
	if (x.style.display === 'none') {
		x.style.display = 'block';
	} else {
		x.style.display = 'none';
	}
	if (y.style.display === 'block') {
		y.style.display = 'none';
	} else {
		y.style.display = 'block';
	}
};

const SearchSection = () => {
	return (
		<div style={sectionStyle}>
			<div>
				<Search />
			</div>
			<div style={rightStyle}>
				<Button {...{ buttonText: 'Add new course', handleClick }} />
			</div>
		</div>
	);
};

export default SearchSection;
