import React from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Author from '../Author/Author';
import { mockedAuthorsList } from '../../resources/CoursesInfo/AuthorsList';

const informationsStyle = {
	border: 'black solid 2px',
	display: 'flex',
	flexDirection: 'column',
	margin: '20px',
};
const authorStyle = {
	margin: ' 20px',
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	textAlign: 'left',
};
const otherInfoStyle = {
	margin: ' 20px',
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	textAlign: 'left',
};

const Information = () => {
	const addCourse = () => {
		const x = document.getElementById('sdf');
		const y = document.getElementById('sfsfs');
		if (x.style.display === 'none') {
			x.style.display = 'block';
		} else {
			x.style.display = 'none';
		}
		if (y.style.display === 'block') {
			y.style.display = 'none';
		} else {
			y.style.display = 'block';
		}
	};
	const deleteCourse = () => {
		const x = document.getElementById('sfds');
		const y = document.getElementById('sdfdfsdfs');
		if (x.style.display === 'none') {
			x.style.display = 'block';
		} else {
			x.style.display = 'none';
		}
		if (y.style.display === 'block') {
			y.style.display = 'none';
		} else {
			y.style.display = 'block';
		}
	};
	return (
		<div style={informationsStyle}>
			<div style={authorStyle}>
				<div>
					<h3>Add Authors</h3>
					<div>
						<p>Author name</p>
						<Input placeholderText='Enter author name...' />
						<Button buttonText='Create author' />
					</div>
				</div>
				<div>
					<h3>Authors</h3>
					<div>
						{mockedAuthorsList.map((author) => {
							return (
								<Author
									{...{
										authorName: author.name,
										id: author.id,
										buttonText: 'Add author',
										handleClick: addCourse,
									}}
								/>
							);
						})}
					</div>
				</div>
			</div>
			<div style={otherInfoStyle}>
				<div>
					<h3>Duration</h3>
					<p>Duration</p>
					<Input placeholderText='Enter duration in minutes...' />
					<p>
						Duration <b>00:00</b> hours
					</p>
				</div>
				<div>
					<h3>Course authors</h3>
					<p>Author list is empty</p>
					{mockedAuthorsList.map((author) => {
						return (
							<Author
								{...{
									authorName: author.name,
									id: author.id,
									buttonText: 'Delete author',
									handleClick: addCourse,
								}}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Information;
