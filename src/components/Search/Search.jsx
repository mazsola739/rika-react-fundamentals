import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Input from '../Input/Input';
import Button from '../Button/Button';

const isCourseMatch = (course, filter) =>
	course.toUpperCase().indexOf(filter) >= 0;
const isMatch = (courseByTitle, courseById, filter) =>
	isCourseMatch(courseByTitle, filter) || isCourseMatch(courseById, filter);

const Search = ({ setFilterCourse, filterCourse, courses }) => {
	const [searchValue, setSearchValue] = useState('');

	const searchChangeHandler = (e) => {
		const input = e.target.value;
		setSearchValue(() => input);
	};

	const searchClickHandler = (e) => {
		e.preventDefault();
		const filter = searchValue.toUpperCase();
		setFilterCourse([...courses]);

		let matchedCourse = [];
		courses.forEach((course) => {
			const match = isMatch(course.title, course.id, filter);
			if (match) {
				matchedCourse.push(course);
			}
		});

		setFilterCourse([...matchedCourse]);
		matchedCourse = [];
	};

	setFilterCourse(courses);

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
	setSearchCards: PropTypes.any,
};

export default Search;
