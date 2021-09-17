import React from 'react';
import Courses from '../Courses/Courses';
import CreateCourse from '../CreateCourse/CreateCourse';
import SearchSection from '../SearchSection/SearchSection';

const bodyStyle = {
	border: 'blue solid 2px',
	margin: '20px',
	display: 'flex',
	flexDirection: 'column',
};
const BodySection = () => {
	return (
		<div style={bodyStyle}>
			<SearchSection />
			<div id='courses'>
				<Courses />
			</div>
			<div id='createCourses'>
				<CreateCourse />
			</div>
		</div>
	);
};

export default BodySection;
