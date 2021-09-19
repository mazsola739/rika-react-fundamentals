import React, { useContext } from 'react';
import CourseCard from '../CourseCard/CourseCard';
import Button from '../Button/Button';
import Search from '../Search/Search';

import { AppContext } from '../Context/AppContext';

const Courses = () => {
	const { cards } = useContext(AppContext);

	const handleClick = () => {
		const courses = document.getElementById('createCourses');
		const createCourse = document.getElementById('courses');
		if (courses.style.display === 'none') {
			courses.style.display = 'block';
			createCourse.style.display = 'none';
		} else {
			courses.style.display = 'none';
			createCourse.style.display = 'block';
		}
	};

	return (
		<div className='border border-primary border-2 rounded-1 p-4 my-3'>
			<div className=' py-2'>
				<div className='row align-items-center'>
					<div className='col-sm-8'>
						<Search />
					</div>
					<div className='col-sm-4'>
						<Button {...{ buttonText: 'Add new course', handleClick }} />
					</div>
				</div>
			</div>
			<div className='row align-items-center'>
				{cards.map((course) => {
					return <CourseCard key={course.id} {...course} />;
				})}
			</div>
		</div>
	);
};

export default Courses;
