import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { connect, useDispatch } from 'react-redux';
import { filterCourses } from 'store/courses/actionCreators';

const isCourseMatch = (course, filterText) =>
	course.toUpperCase().indexOf(filterText) >= 0;
const isMatch = (courseByTitle, courseById, filterText) =>
	isCourseMatch(courseByTitle, filterText) ||
	isCourseMatch(courseById, filterText);

const Search = ({ allCourses }) => {
	const [searchValue, setSearchValue] = useState('');

	const dispatch = useDispatch();

	const searchChangeHandler = (e) => {
		const input = e.target.value;
		setSearchValue(input);
	};

	if (!searchValue) dispatch(filterCourses(allCourses));

	const searchClickHandler = (e) => {
		e.preventDefault();
		const filterText = searchValue.toUpperCase();
		let matchedCourse = [];
		allCourses.forEach((course) => {
			const match = isMatch(course.title, course.id, filterText);
			if (match) {
				matchedCourse.push(course);
			}
		});
		dispatch(filterCourses(matchedCourse));
		matchedCourse = [];
	};

	return (
		<div className='row'>
			<div className='col'>
				<Input
					placeholderText='Enter course name or id...'
					changeHandler={searchChangeHandler}
					value={searchValue}
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
	allCourses: PropTypes.array,
};

// @ts-ignore
export default connect(({ courses: { allCourses } }) => ({
	allCourses,
}))(Search);
