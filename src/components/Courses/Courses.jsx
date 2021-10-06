import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CourseCard from '../CourseCard/CourseCard';
import Button from '../Button/Button';
import Search from '../Search/Search';
import { connect } from 'react-redux';

const Courses = ({ courses, authors }) => {
	return (
		<div className='border border-dark border-1 rounded-1 p-4 my-3'>
			<div className=' py-2'>
				<div className='row'>
					<div className='col-sm-8'>
						<Search />
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
				{courses.courses.map((course) => {
					return (
						<CourseCard
							key={course.id}
							{...course}
							authorNames={authors.authors}
							courses={courses}
						/>
					);
				})}
			</div>
		</div>
	);
};

Courses.propTypes = {
	courses: PropTypes.object,
	authors: PropTypes.object,
};

// @ts-ignore
export default connect(({ courses, authors }) => ({
	courses,
	authors,
}))(Courses);
