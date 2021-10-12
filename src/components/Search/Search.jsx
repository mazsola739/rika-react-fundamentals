import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { connect, useDispatch } from 'react-redux';

const isCourseMatch = (course, filterText) =>
	course.toUpperCase().indexOf(filterText) >= 0;
const isMatch = (courseByTitle, courseById, filterText) =>
	isCourseMatch(courseByTitle, filterText) ||
	isCourseMatch(courseById, filterText);

const Search = ({ courses }) => {
	let searchValue = '';
	//let allCourses = courses;
	const dispatch = useDispatch();

	const searchChangeHandler = (e) => {
		searchValue = e.target.value;
	};

	//if (!searchValue) dispatch(allCourses);

	const searchClickHandler = (e) => {
		e.preventDefault();
		const filterText = searchValue.toUpperCase();
		let matchedCourse = [];
		courses.forEach((course) => {
			const match = isMatch(course.title, course.id, filterText);
			if (match) {
				matchedCourse.push(course);
			}
		});
		dispatch(matchedCourse);
		matchedCourse = [];
	};

	return (
		<div className='row'>
			<div className='col'>
				<Input
					placeholderText='Enter course name or id...'
					changeHandler={searchChangeHandler}
					defaultValue={searchValue}
					text='Search'
					name={undefined}
				/>
			</div>
			<div className='col'>
				<Button
					text='Search'
					clickHandler={searchClickHandler}
					icon={undefined}
				/>
			</div>
		</div>
	);
};

Search.propTypes = {
	courses: PropTypes.array,
};

// @ts-ignore
export default connect(({ courses }) => ({
	courses,
}))(Search);
