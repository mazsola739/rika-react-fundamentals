import React, { useRef, useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import DisplayAuthor from '../CreateCourse/DisplayAuthor';
import { mockedAuthorsList } from '../../CoursesInfo/AuthorsList';
// import { v4 as uuidv4 } from 'uuid';

// const { v4: uuidv4 } = require('uuid');

const textareaStyle = {
	height: '100px',
};

const newCourse = [];
let displayHours = '';
const CreateCourse = ({ backToCourse, setCards, cards }) => {
	//const [newTitleValue, setNewTitleValue] = useState('');
	//const [newDescriptionValue, setNewDescriptionValue] = useState('');
	//const [newAuthorValue, setNewAuthorValue] = useState('');
	//const [newDurationValue, setDurationValue] = useState('');

	const inputTitleRef = useRef();
	const inputDescriptionRef = useRef();
	const inputAuthorRef = useRef();
	const inputDurationRef = useRef();

	const handleChangeTitle = (e) => {
		console.log(e.target.value);
	};
	const handleChangeDescription = (e) => {
		console.log(e.target.value);
	};
	const handleChangeAuthor = (e) => {
		console.log(e.target.value);
	};
	const handleChangeDuration = (e) => {
		const newDuration = +inputDurationRef.current.value;
		const showDuration = `${Math.floor(newDuration / 60)}:${newDuration % 60}`;
		displayHours += showDuration;
		console.log(displayHours);
	};

	const handleClick = (e) => {
		e.preventDefault();
		const newTitle = inputTitleRef.current.value;
		const newDescription = inputDescriptionRef.current.value;
		const newAuthor = inputAuthorRef.current.value;
		const newDuration = inputDurationRef.current.value;

		if (!newTitle || !newDescription || !newAuthor || !newDuration) {
			alert('Please, fill in all fields');
		} else {
			const newObject = {
				id: 4, //uuid
				title: newTitle,
				description: newDescription,
				authors: [newAuthor],
				duration: newDuration,
			};

			setCards([...cards, newObject]);
			backToCourse(true);
		}
		console.log(newCourse);
	};

	return (
		<div className='border border-primary border-2 rounded-1 p-3 my-3'>
			<div className='row'>
				<div className='col'>
					<p>Title</p>
					<Input
						ref={inputTitleRef}
						changeHandler={handleChangeTitle}
						inputId='inputTitle'
						placeholderText='Enter title...'
					/>
				</div>
				<div className='col'>
					<Button handleClick={handleClick} buttonText='Create course' />
				</div>
			</div>
			<div className='row p-2 my-3'>
				<p>Description</p>
				<textarea
					ref={inputDescriptionRef}
					onChange={handleChangeDescription}
					style={textareaStyle}
					className='border border-secondary border-2 form-control'
					placeholder='Enter description'
				/>
			</div>
			<div className='border border-dark border-2 rounded-1 p-2'>
				<div className='row'>
					<div className='col'>
						<h5 className='text-center'>Add Authors</h5>
						<div>
							<p>Author name</p>
							<Input
								changeHandler={handleChangeAuthor}
								inputId='inputAuthor'
								ref={inputAuthorRef}
								placeholderText='Enter author name...'
							/>
						</div>
						<div className='col p-2 text-center'>
							<Button buttonText='Create author' />
						</div>
					</div>
					<div className='col'>
						<h5 className='text-center'>Authors</h5>
						<div>
							{mockedAuthorsList.map((author) => (
								<DisplayAuthor
									key={author.id}
									authorName={author.name}
									id={author.id}
									buttonText='Add author'
								/>
							))}
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<h5 className='text-center'>Duration</h5>
						<p>Duration</p>
						<Input
							changeHandler={handleChangeDuration}
							inputId='inputDuration'
							ref={inputDurationRef}
							placeholderText='Enter duration in minutes...'
						/>
						<p>
							Duration <b>{displayHours}</b> hours
						</p>
					</div>
					<div className='col'>
						<h5 className='text-center'>Course authors</h5>
						<div className='text-center'>
							<span>Author list is empty</span>
						</div>
						{mockedAuthorsList.map((author) => (
							<DisplayAuthor
								key={author.id}
								authorName={author.name}
								id={author.id}
								buttonText='Delete author'
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateCourse;
