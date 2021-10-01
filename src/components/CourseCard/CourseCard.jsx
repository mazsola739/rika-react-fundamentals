import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './CourseCard.css';

import Button from '../Button/Button';

const cardStyle = {
	maxHeight: '200px',
};

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

const CourseCard = ({
	id,
	title,
	description,
	authors,
	duration,
	creationDate,
	authorNames,
}) => {
	return (
		<div
			style={cardStyle}
			className='bg-success bg-opacity-10 border border-success border-2 rounded-1 p-4 my-2'
		>
			<div className='row'>
				<div className='col-sm-8'>
					<h3>{title}</h3>
					<span className='description' title={description}>
						{description}
					</span>
				</div>

				<div className='col-sm-4'>
					<div className='row p-1'>
						<span
							className='author'
							title={`${showAuthor(authors, authorNames)}`}
						>
							<b>Authors: </b> {showAuthor(authors, authorNames)}
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
							{creationDate && creationDate.replaceAll('/', '.')}
						</span>
					</div>
					<div className='col p-1'>
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
							clickHandler={undefined}
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
};

export default CourseCard;
