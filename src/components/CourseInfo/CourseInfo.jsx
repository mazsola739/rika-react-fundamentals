import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

const CourseInfo = ({ courses, authorNames }) => {
	const pathParam = useParams();
	let thisCourseId = Object.values(pathParam).join();
	let thisCourse = {};
	courses.map((course) => {
		if (course.id === thisCourseId) {
			const hours = Math.floor(course.duration / 60);
			const minutes = course.duration % 60;
			const displayDuration = `${hours < 10 ? '0' + hours : hours}:${
				minutes < 10 ? '0' + minutes : minutes
			} hours`;
			const authorList = course.authors
				.map((authorId) => {
					let foundAuthor = authorId;
					authorNames.map(
						(author) =>
							(foundAuthor = author.id === authorId ? author.name : foundAuthor)
					);
					return foundAuthor;
				})
				.join(', ');
			const created = course.creationDate.replaceAll('/', '.');
			thisCourse = {
				id: course.id,
				title: course.title,
				creationDate: created,
				description: course.description,
				authors: authorList,
				duration: displayDuration,
			};
		}
		return console.log(course);
	});

	return (
		<div className='border border-primary border-2 rounded-1 p-4 my-3'>
			<Link to='/courses'>
				<Button
					buttonText='&lt; Back to courses'
					buttonClickHandler={undefined}
				/>
			</Link>
			<h2 className='text-center'>{thisCourse.title}</h2>
			<div className='row'>
				<div className='col-sm-8'>{thisCourse.description}</div>
				<div className='col-sm-4'>
					<p>ID: {thisCourse.id}</p>
					<p>Duration: {thisCourse.duration}</p>
					<p>Created: {thisCourse.creationDate}</p>
					<p>Authors: {thisCourse.authors}</p>
				</div>
			</div>
		</div>
	);
};

CourseInfo.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	authorList: PropTypes.string,
	displayDuration: PropTypes.string,
};

export default CourseInfo;
