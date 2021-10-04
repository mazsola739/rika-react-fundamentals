import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import CourseCard from '../CourseCard/CourseCard';
import Button from '../Button/Button';
import Search from '../Search/Search';
import { useSelector } from 'react-redux';

const Courses = ({ store }) => {
	const [filterCourse, setFilterCourse] = useState([]);
	const courses = store.getState().courses;
	const authors = store.getState().authors;

	const callBack = (courses) => {
		setFilterCourse(courses);
	};

	//!ez nem szép
	const remainingCourse = useSelector((state) => state);
	console.log(remainingCourse);

	return (
		<div className='border border-dark border-1 rounded-1 p-4 my-3'>
			<div className=' py-2'>
				<div className='row'>
					<div className='col-sm-8'>
						<Search
							store={store}
							callBack={(e) => {
								callBack(e);
							}}
						/>
					</div>
					<div className='col-sm-4 d-flex justify-content-end'>
						<Link to='/courses/add'>
							<Button
								text='Add new course'
								icon={undefined}
								clickHandler={undefined}
							/>
						</Link>
					</div>
				</div>
			</div>
			<div className='row'>
				{filterCourse.length > 0
					? filterCourse.map((course) => {
							return (
								<CourseCard
									key={course.id}
									{...course}
									allAuthors={authors}
									store={store}
								/>
							);
					  })
					: courses.map((course) => {
							return (
								<CourseCard
									key={course.id}
									{...course}
									allAuthors={authors}
									store={store}
								/>
							);
					  })}
			</div>
		</div>
	);
};

Courses.propTypes = {
	store: PropTypes.object,
};

export default Courses;
