import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import CourseCard from '../CourseCard/CourseCard';
import Button from '../Button/Button';
import Search from '../Search/Search';

const Courses = ({ store }) => {
	const [filterCourse, setFilterCourse] = useState([]);
	const courses = store.getState().courses;
	const authors = store.getState().authors;
	return (
		<div className='bg-primary bg-opacity-10 border border-primary border-2 rounded-1 p-4 my-3'>
			<div className=' py-2'>
				<div className='row'>
					<div className='col-sm-8'>
						<Search
							courses={courses}
							filterCourse={filterCourse}
							setFilterCourse={setFilterCourse}
						/>
					</div>
					<div className='col-sm-4 d-flex justify-content-end'>
						<Link to='/courses/add'>
							<Button text='Add new course' icon={undefined} />
						</Link>
					</div>
				</div>
			</div>
			<div className='row'>
				{filterCourse.map((course) => {
					return (
						<CourseCard key={course.id} {...course} allAuthors={authors} />
					);
				})}
			</div>
		</div>
	);
};

Courses.propTypes = {
	goToCreateCourse: PropTypes.any,
	cards: PropTypes.any,
};

export default Courses;
