import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

const CourseInfo = ({
	title,
	description,
	id,
	displayDuration,
	authorList,
}) => {
	const [getCourse, setGetCourse] = useState([]);

	const getCourseInfo = async () => {
		const response = await fetch('./CoursesList.js');
		const course = await response.json();
		setGetCourse(course);
	};

	useEffect(() => {
		getCourseInfo();
	}, []);
	return (
		<div className='border border-primary border-2 rounded-1 p-4 my-3'>
			<Link to='/courses'>
				<Button
					buttonText='&lt; Back to courses'
					buttonClickHandler={undefined}
				/>
			</Link>
			<h2 className='text-center'>{title}</h2>
			<div className='row'>
				<div className='col-sm-8'>{description}</div>
				<div className='col-sm-4'>
					<p>ID: {id}</p>
					<p>Duration: {displayDuration}</p>
					<p>Created: </p>
					<p>Authors: {authorList}</p>
				</div>
			</div>
		</div>
	);
};

CourseInfo.propTypes = {
	id: PropTypes.any,
	title: PropTypes.any,
	description: PropTypes.any,
	authorList: PropTypes.any,
	displayDuration: PropTypes.any,
};

export default CourseInfo;
