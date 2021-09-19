import React, { useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Author from '../Author/Author';
import { mockedAuthorsList } from '../../CoursesInfo/AuthorsList';
//import { v4 as uuidv4 } from 'uuid';

//const { v4: uuidv4 } = require('uuid');

const textareaStyle = {
	height: '100px',
};

const CreateCourse = () => {
	const [addClick] = useState({
		handleClick: () => {
			console.log('batman');
		},
	});
	const [deleteClick] = useState({
		handleClick: () => {
			console.log('superman');
		},
	});

	const handleClick = () => {
		const courses = document.getElementById('createCourses');
		const createCourse = document.getElementById('courses');
		if (createCourse.style.display === 'none') {
			createCourse.style.display = 'block';
			courses.style.display = 'none';
		} else {
			createCourse.style.display = 'none';
			courses.style.display = 'block';
		}
	};
	return (
		<div className='border border-primary border-2 rounded-1 p-3 my-3'>
			<div className='row'>
				<div className='col'>
					<p>Title</p>
					<Input placeholderText='Enter title...' />
				</div>
				<div className='col'>
					<Button {...{ handleClick, buttonText: 'Create course' }} />
				</div>
			</div>
			<div className='row p-2 my-3'>
				<p>Description</p>
				<textarea
					style={textareaStyle}
					className='border border-secondary border-2 form-control'
					placeholder='Enter description'
				></textarea>
			</div>
			<div className='border border-dark border-2 rounded-1 p-2'>
				<div className='row'>
					<div className='col'>
						<h5 className='text-center'>Add Authors</h5>
						<div>
							<p>Author name</p>
							<Input placeholderText='Enter author name...' />
						</div>
						<div className='col p-2 text-center'>
							<Button {...{ buttonText: 'Create author' }} />
						</div>
					</div>
					<div className='col'>
						<h5 className='text-center'>Authors</h5>
						<div>
							{mockedAuthorsList.map((author) => {
								return (
									<Author
										key={author.id}
										{...{
											authorName: author.name,
											id: author.id,
											onClick: addClick,
											buttonText: 'Add author',
										}}
									/>
								);
							})}
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<h5 className='text-center'>Duration</h5>
						<p>Duration</p>
						<Input placeholderText='Enter duration in minutes...' />
						<p>
							Duration <b>00:00</b> hours
						</p>
					</div>
					<div className='col'>
						<h5 className='text-center'>Course authors</h5>
						<div className='text-center'>
							<span>Author list is empty</span>
						</div>
						{mockedAuthorsList.map((author) => {
							return (
								<Author
									key={author.id}
									{...{
										authorName: author.name,
										id: author.id,
										onClick: deleteClick,
										buttonText: 'Delete author',
									}}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateCourse;
