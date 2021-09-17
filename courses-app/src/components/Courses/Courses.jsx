import React from 'react';
import CourseCard from '../CourseCard/CourseCard';
import { mockedCoursesList } from '../../resources/CoursesInfo/CoursesList';

const cardsStyle = {
	display: 'flex',
	flexDirection: 'column',
};

const Courses = () => {
	return (
		<div>
			<div style={cardsStyle}>
				{mockedCoursesList.map((course) => {
					return <CourseCard key={course.id} {...course} />;
				})}
			</div>
		</div>
	);
};

export default Courses;
