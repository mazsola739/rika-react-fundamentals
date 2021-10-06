import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { displayDate } from 'utilities/dateFormatter';
import { formatDuration } from 'utilities/durationFormatter';
import { showAuthor } from 'utilities/authorFormatter';
import { connect } from 'react-redux';

const CourseInfo = ({ courses, authors }) => {
	const pathParam = useParams();
	const thisCourseId = Object.values(pathParam).join();
	const thisCourse = courses.courses.find(
		(course) => course.id === thisCourseId
	);

	return (
		<div className='border border-dark border-1 rounded-1 p-4 my-3'>
			<Link to='/courses'>
				<Button
					size={{ width: '200px' }}
					clickHandler={undefined}
					text='&lt; Back to courses'
					icon={undefined}
				/>
			</Link>
			<h2 className='text-center bg-info bg-opacity-20 rounded-1 mx-1 my-3 py-1'>
				{thisCourse.title}
			</h2>
			<div className='row border border-info border-1 rounded-1 p-3 m-2'>
				<div className='col-sm-7 alert alert-info ms-3'>
					{thisCourse.description}
				</div>
				<div className='col alert alert-info mx-3'>
					<p>
						<b>ID: </b>
						{thisCourse.id}
					</p>
					<p>
						<b>Duration: </b>
						{formatDuration(thisCourse.duration)}
					</p>
					<p>
						<b>Created: </b>
						{displayDate(thisCourse.creationDate)}
					</p>
					<p>
						<b>Authors: </b>
						{showAuthor(thisCourse.authors, authors)}
					</p>
				</div>
			</div>
		</div>
	);
};

CourseInfo.propTypes = {
	authors: PropTypes.array,
	courses: PropTypes.object,
};

// @ts-ignore
export default connect(({ courses, authors }) => ({
	courses,
	authors,
}))(CourseInfo);
