import React from 'react';
import Button from '../Button/Button';
import { mockedAuthorsList } from '../../CoursesInfo/AuthorsList';
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
}) => {
	/*const authorList = `${authors.map((authorId) => {
		let foundAuthor = authorId;
		mockedAuthorsList.map(
			(author) =>
				(foundAuthor = author.id === authorId ? author.name : foundAuthor)
		);
		return foundAuthor;
	})}`.replaceAll(',', ', ');*/
	const authorList = [];
	console.log(id, title, description, authors, duration, creationDate);
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
							{`${Math.floor(duration / 60)}:${duration % 60} hours`}
						</span>
					</div>
					<div className='row p-1'>
						<span>
							<b>Created: </b>
							{creationDate && creationDate.replaceAll('/', '.')}
						</span>
					</div>
					<div className='row p-1'>
						<Button buttonText='Show course' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
