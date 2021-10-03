import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './CourseCard.css';
import Button from '../Button/Button';
import { formatDuration, showAuthor } from 'components/Formatters';
import { deleteCourse } from 'store/courses/actionCreators';
import { useDispatch } from 'react-redux';
//! import axios from 'axios';

/*//!const getApiService = () => {
	const token = localStorage.getItem('token');
	return axios.create({
		baseURL: 'http://localhost:3000',
		headers: { 'Content-type': 'application/json', Authorization: token },
	});
};*/

const CourseCard = ({
	id,
	title,
	description,
	authors,
	duration,
	creationDate,
	allAuthors,
	store,
}) => {
	const dispatch = useDispatch();
	const courses = store.getState().courses;
	const deleteThisCourse = (e) => {
		e.preventDefault();
		const thisCourse = courses.find((course) => course.id === id).id;
		//!	getApiService().delete(`/courses/${id}`);  delete from api
		dispatch(deleteCourse(thisCourse)); //! delete from store
	};

	return (
		<div
			style={{ maxHeight: '200px' }}
			className='border border-info border-1 rounded-1 p-4 my-2'
		>
			<div className='row'>
				<div className='alert alert-info col-sm-8'>
					<h3 className='bg-info bg-opacity-20 rounded-1'>{title}</h3>
					<span className='description' title={description}>
						{description}
					</span>
				</div>

				<div className='col-sm-4'>
					<div className='row p-1'>
						<span
							className='author'
							title={`${showAuthor(authors, allAuthors)}`}
						>
							<b>Authors: </b> {showAuthor(authors, allAuthors)}
						</span>
					</div>
					<div className='row p-1'>
						<span>
							<b>Duration: </b>
							{formatDuration(duration)}
						</span>
					</div>
					<div className='row p-1'>
						<span>
							<b>Created: </b>
							{creationDate.replaceAll('/', '.')}
						</span>
					</div>
					<div className='col p-1' key={id}>
						<Link to={`/courses/${id}`}>
							<Button
								text='Show course'
								clickHandler={undefined}
								icon={undefined}
							/>
						</Link>
						<Button
							size={{ width: '50px' }}
							text={undefined}
							clickHandler={deleteThisCourse}
							icon='fa fa-trash'
						/>
						<Button
							size={{ width: '50px' }}
							text={undefined}
							clickHandler={undefined}
							icon='fa fa-edit'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

CourseCard.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	authors: PropTypes.array,
	duration: PropTypes.number,
	creationDate: PropTypes.string,
	allAuthors: PropTypes.array,
	store: PropTypes.object,
};

export default CourseCard;
