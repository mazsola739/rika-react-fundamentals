import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CourseCard from '../CourseCard/CourseCard';
import Button from '../Button/Button';
import Search from '../Search/Search';
import { connect } from 'react-redux';
import { useState } from 'react';

const Courses = ({ courses: allCourses, authors, user }) => {
	const [courses, setCourses] = useState(allCourses);
	const isAdmin = user.email === 'admin@email.com';

	useEffect(() => {
		setCourses(allCourses);
	}, [allCourses]);

	return (
		<div className='border border-dark border-1 rounded-1 p-4 my-3'>
			<div className=' py-2'>
				<div className='row'>
					<div className='col-sm-8'>
						<Search
							getFilteredCourses={(filteredCourses) => {
								setCourses(filteredCourses);
							}}
						/>
					</div>
					<div className='col-sm-4 d-flex justify-content-end'>
						{isAdmin ? (
							<Link to='/courses/add'>
								<Button
									text='Add new course'
									icon={undefined}
									clickHandler={undefined}
								/>
							</Link>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
			<div className='row'>
				{courses.map((course) => {
					return (
						<CourseCard
							isAdmin={isAdmin}
							key={course.id}
							{...course}
							authorNames={authors}
						/>
					);
				})}
			</div>
		</div>
	);
};

Courses.propTypes = {
	courses: PropTypes.array,
	authors: PropTypes.array,
};

// @ts-ignore
export default connect(({ courses, authors, user }) => ({
	courses,
	authors,
	user,
}))(Courses);
