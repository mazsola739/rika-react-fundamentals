import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

const formatDuration = (duration) => {
	const hours = Math.floor(duration / 60);
	const minutes = duration % 60;
	const displayDuration = `${hours < 10 ? '0' + hours : hours}:${
		minutes < 10 ? '0' + minutes : minutes
	} hours`;
	return displayDuration;
};

const showAuthor = (authors, names) => {
	const authorList = authors
		.map((authorId) => {
			let foundAuthor = authorId;
			names.map(
				(author) =>
					(foundAuthor = author.id === authorId ? author.name : foundAuthor)
			);
			return foundAuthor;
		})
		.join()
		.replaceAll(',', ', ');
	return authorList;
};

const CourseInfo = ({ store }) => {
	const courses = store.getState().courses;
	const authors = store.getState().authors;
	const pathParam = useParams();
	const thisCourseId = Object.values(pathParam).join();
	const thisCourse = courses.find((course) => course.id === thisCourseId);

	return (
		<div className='bg-primary bg-opacity-10 border border-primary border-2 rounded-1 p-4 my-3'>
			<Link to='/courses'>
				<Button
					size={{ width: '200px' }}
					text='&lt; Back to courses'
					clickHandler={undefined}
					icon={undefined}
				/>
			</Link>
			<h2 className='text-center'>{thisCourse.title}</h2>
			<div className='row'>
				<div className='col-sm-8 '>{thisCourse.description}</div>
				<div className='col-sm-4'>
					<p>ID: {thisCourse.id}</p>
					<p>Duration: {formatDuration(thisCourse.duration)}</p>
					<p>Created: {thisCourse.creationDate.replaceAll('/', '.')}</p>
					<p>Authors: {showAuthor(thisCourse.authors, authors)}</p>
				</div>
			</div>
		</div>
	);
};

CourseInfo.propTypes = {
	id: PropTypes.string,
};

export default CourseInfo;
