import React from 'react';
import Button from '../Button/Button';
import { mockedAuthorsList } from '../../resources/CoursesInfo/AuthorsList';

const courseCardStyle = {
	border: 'green solid 2px',
	margin: '20px',
	display: 'flex',
	flexDirection: 'row',
};
const courseInfoStyle = {
	display: 'flex',
	flexDirection: 'column',
	margin: '20px',
	width: '70%',
	textAlign: 'left',
};
const courseDataStyle = {
	width: '30%',
	display: 'flex',
	flexDirection: 'column',
	margin: '20px',
	textAlign: 'left',
};

const CourseCard = ({
	id,
	title,
	description,
	authors,
	duration,
	creationDate,
}) => {
	const author = `${authors.map((el) => {
		let author = el;
		mockedAuthorsList.map((el) => (el.id === author ? (author = el.name) : ''));
		return author;
	})}`;

	return (
		<div id='card' style={courseCardStyle}>
			<div style={courseInfoStyle}>
				<h1 id={id}>{title}</h1>
				<p>
					{description.length > 200
						? description.substring(0, 200) + '...'
						: description}
				</p>
			</div>
			<div style={courseDataStyle}>
				<p>
					<b>Authors:</b>{' '}
					{author.length > 20 ? author.substring(0, 20) + '...' : author}
				</p>
				<p>
					<b>Duration:</b>{' '}
					{`${Math.floor(duration / 60)}:${duration % 60} hours`}
				</p>
				<p>
					<b>Created:</b> {creationDate.replaceAll('/', '.')}
				</p>
				<Button buttonText='Show course' />
			</div>
		</div>
	);
};

export default CourseCard;
