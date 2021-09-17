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
	title,
	description,
	authors,
	duration,
	creationDate,
}) => {
	const nameID = JSON.parse(JSON.stringify(mockedAuthorsList)).map(
		(el) => el.id
	);
	const name = JSON.parse(JSON.stringify(mockedAuthorsList)).map(
		(el) => el.name
	);
	return (
		<div style={courseCardStyle}>
			<div style={courseInfoStyle}>
				<h1>{title}</h1>
				<p>{description}</p>
			</div>
			<div style={courseDataStyle}>
				<p>
					<b>Authors:</b>
					{authors.map((el, i) => {
						return el === nameID[i] ? name[i] : 'hiba';
					})}
				</p>
				<p>
					<b>Duration:</b>{' '}
					{`${Math.floor(duration / 60)}:${+duration % 60} hours`}
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
