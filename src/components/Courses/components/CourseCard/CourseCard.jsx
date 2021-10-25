import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import './CourseCard.css';
import { Button } from 'common';

import { deleteCourse } from 'store/courses/actionCreators';
import { displayDate, pipeDuration, showAuthor } from 'helpers';

const CourseCard = ({
	id,
	title,
	description,
	authors,
	duration,
	creationDate,
	authorNames,
	isAdmin,
}) => {
	const dispatch = useDispatch();

	const deleteCourseClickHandler = (e) => {
		e.preventDefault();
		dispatch(deleteCourse(id));
	};

	return (
		<div
			data-testid={id}
			style={{ maxHeight: '200px' }}
			className='border border-info border-1 rounded-1 p-4 my-2'
		>
			<div className='row'>
				<div className='alert alert-info col-sm-8'>
					<h3 data-testid='title' className='bg-info bg-opacity-20 rounded-1'>
						{title}
					</h3>
					<span
						data-testid='description'
						className='description'
						title={description}
					>
						{description}
					</span>
				</div>

				<div className='col-sm-4'>
					<div className='row p-1'>
						<span
							data-testid='authors'
							className='author'
							title={`${showAuthor(authors, authorNames)}`}
						>
							<b>Authors: </b> {showAuthor(authors, authorNames)}
						</span>
					</div>
					<div className='row p-1'>
						<span data-testid='duration'>
							<b>Duration: </b>
							{pipeDuration(duration)}
						</span>
					</div>
					<div className='row p-1'>
						<span data-testid='created'>
							<b>Created: </b>
							{displayDate(creationDate)}
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
						{isAdmin ? (
							<>
								<Button
									size={{ width: '50px' }}
									text={undefined}
									clickHandler={deleteCourseClickHandler}
									icon='fa fa-trash'
								/>
								<Link to={`/courses/update/${id}`}>
									<Button
										size={{ width: '50px' }}
										text={undefined}
										clickHandler={undefined}
										icon='fa fa-edit'
									/>
								</Link>
							</>
						) : (
							<></>
						)}
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
	authorNames: PropTypes.array,
};

export default CourseCard;
