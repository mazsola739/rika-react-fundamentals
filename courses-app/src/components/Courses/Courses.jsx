import React from 'react';
import Search from '../Search/Search';
import CourseCard from '../CourseCard/CourseCard';
import Button from '../Button/Button';

const coursesStyle = {
	border: 'blue solid 2px',
	margin: '20px',
	display: 'flex',
	flexDirection: 'column',
};
const topStyle = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
};
const cardsStyle = {
	display: 'flex',
	flexDirection: 'column',
};

const Courses = () => (
	<div style={coursesStyle}>
		<div style={topStyle}>
			<Search />
			<Button />
		</div>
		<div style={cardsStyle}>
			<CourseCard />
		</div>
	</div>
);

export default Courses;
