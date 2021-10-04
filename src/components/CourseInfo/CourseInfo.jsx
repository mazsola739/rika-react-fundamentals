import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { displayDate, formatDuration, showAuthor } from 'components/Formatters';
import { getApiService } from 'components/ApiService';

const CourseInfo = ({ store }) => {
	const [course, setCourse] = useState({});
	const courses = store.getState().courses;
	const authors = store.getState().authors;
	const pathParam = useParams();
	const thisCourseId = Object.values(pathParam).join();

	//! store
	const thisCourse = courses.find((course) => course.id === thisCourseId);

	//! backend
	useEffect(() => {
		const fetchThisCourse = () => {
			getApiService()
				.get(`/courses/${thisCourseId}`)
				.then((response) => response.data)
				.then((myJson) => setCourse(myJson.result));
		};
		fetchThisCourse();
	}, [thisCourseId]);

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
				{
					// @ts-ignore
					course.title
				}
			</h2>
			<div className='row border border-info border-1 rounded-1 p-3 m-2'>
				<div className='col-sm-7 alert alert-info ms-3'>
					{
						// @ts-ignore
						course.description
					}
				</div>
				<div className='col alert alert-info mx-3'>
					<p>
						<b>ID: </b>
						{
							// @ts-ignore
							course.id
						}
					</p>
					<p>
						<b>Duration: </b>
						{formatDuration(
							// @ts-ignore
							course.duration
						)}
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
	store: PropTypes.object,
};

export default CourseInfo;
