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

const CourseCard = ({ title, description }) => {
	const AuthorName = ({ author }) => {
		return mockedAuthorsList.name;
	};
	const DurationTime = ({ duration }) => {
		let hours = Math.floor(duration / 60);
		let minutes = duration % 60;
		return hours + ':' + minutes;
	};
	const CreationDate = ({ creationDate }) => {
		return 'datedate';
	};
	return (
		<div style={courseCardStyle}>
			<div style={courseInfoStyle}>
				<h1>{title}</h1>
				<p>{description}</p>
			</div>
			<div style={courseDataStyle}>
				<p>
					<b>Authors:</b> <AuthorName />
				</p>
				<p>
					<b>Duration:</b> <DurationTime />
				</p>
				<p>
					<b>Created:</b> <CreationDate />
				</p>
				<Button buttonText='Show course' />
			</div>
		</div>
	);
};

export default CourseCard;
