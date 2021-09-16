import React from 'react';
import Search from '../Search/Search';
import CourseCard from '../CourseCard/CourseCard';
import Button from '../Button/Button';
import { mockedCoursesList } from '../../resources/CoursesInfo/CoursesList';

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

const Courses = () => {
	return (
		<div style={coursesStyle}>
			<div style={topStyle}>
				<Search />
				<Button buttonText='Add new course' />
			</div>
			<div style={cardsStyle}>
				{mockedCoursesList.map((course, index) => {
					return <CourseCard key={course.id} {...course} />;
				})}
			</div>
		</div>
	);
};

export default Courses;
