import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import './CourseCard.css';

const cardStyle = {
	maxHeight: '200px',
};

const CourseCard = ({
	id,
	title,
	description,
	authors,
	duration,
	creationDate,
	authorNames,
}) => {
	const authorList = authors
		.map((authorId) => {
			let foundAuthor = authorId;
			authorNames.map(
				(author) =>
					(foundAuthor = author.id === authorId ? author.name : foundAuthor)
			);
			return foundAuthor;
		})
		.join(', ');
	const hours = Math.floor(duration / 60);
	const minutes = duration % 60;
	const displayDuration = `${hours < 10 ? '0' + hours : hours}:${
		minutes < 10 ? '0' + minutes : minutes
	} hours`;

	return (
		<div
			style={cardStyle}
			className='border border-success border-2 rounded-1 align-items-center p-4 my-2'
		>
			<div className='row'>
				<div className='col-sm-8'>
					<h3 id={id}>{title}</h3>
					<span className='description' title={description} id='overflow'>
						{description}
					</span>
				</div>

				<div className='col-sm-4'>
					<div className='row p-1'>
						<span
							className='author'
							title={`Authors: ${authorList}`}
							id='overflow'
						>
							<b>Authors: </b> {authorList}
						</span>
					</div>
					<div className='row p-1'>
						<span>
							<b>Duration: </b>
							{displayDuration}
						</span>
					</div>
					<div className='row p-1'>
						<span>
							<b>Created: </b>
							{creationDate && creationDate.replaceAll('/', '.')}
						</span>
					</div>
					<div className='row p-1'>
						<Link to='/courses/:courseId'>
							<Button buttonText='Show course' buttonClickHandler={undefined} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

CourseCard.propTypes = {
	id: PropTypes.any,
	title: PropTypes.any,
	description: PropTypes.any,
	authors: PropTypes.any,
	duration: PropTypes.any,
	creationDate: PropTypes.any,
};

export default CourseCard;
