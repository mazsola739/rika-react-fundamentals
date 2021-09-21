import React, { useRef, useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { v4 as uuidv4 } from 'uuid';

// const { v4: uuidv4 } = require('uuid');

const textareaStyle = {
	height: '100px',
};

const CreateCourse = ({
	backToCourse,
	setCards,
	cards,
	key,
	authors,
	setAuthors,
}) => {
	const [displayAuthors, setDisplayAuthors] = useState(true);

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
		console.log(showDuration.length);
	};

	const handleClickCreateAuthor = (e) => {
		e.preventDefault();
		const newAuthorName = inputAuthorRef.current.value;
		const newAuthorUuid = (key = uuidv4());
		const newAuthors = {
			id: newAuthorUuid,
			name: newAuthorName,
		};
		setAuthors([...authors, newAuthors]);
	};

	const handleAddAuthor = (e) => console.log('batman');
	const handleDeleteAuthor = (e) => console.log('superman');

	//const choosedAuthours = [];

	const saveNewCourse = (e) => {
		e.preventDefault();
		const newTitle = inputTitleRef.current.value;
		const newDescription = inputDescriptionRef.current.value;
		const newDuration = inputDurationRef.current.value;
		const newCourseUuid = (key = uuidv4());
		const newCreationDate = new Date().toLocaleDateString();

		if (
			!newTitle ||
			newDescription.length < 2 ||
			/*!newAuthorName ||*/ !newDuration
		) {
			alert('Please, fill in all fields');
		} else {
			const newCourse = {
				id: newCourseUuid,
				title: newTitle,
				creationDate: newCreationDate,
				description: newDescription,
				authors: ['newAuthorUuid'],
				duration: newDuration,
			};
			setCards([...cards, newCourse]);
			backToCourse(true);
		}
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
					<Button handleClick={saveNewCourse} buttonText='Create course' />
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
							<Button
								buttonText='Create author'
								handleClick={handleClickCreateAuthor}
							/>
						</div>
					</div>
					<div className='col'>
						<h5 className='text-center'>Authors</h5>
						<div className='text-center'>
							<span>Author list is empty</span>

							{authors.map((author) => (
								<div className='row' key={author.id} id={author.id}>
									<div className='start col'>
										<span>{author.name} </span>
									</div>
									<div className='start col'>
										<Button
											buttonText='Add Author'
											handleClick={handleAddAuthor}
										/>
									</div>
								</div>
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
							Duration <b></b> hours
						</p>
					</div>
					<div className='col'>
						<h5 className='text-center'>Course authors</h5>
						<div className='text-center'>
							<span>Author list is empty</span>

							{authors.map((author) => (
								<div className='row' key={author.id} id={author.id}>
									<div className='start col'>
										<span>{author.name} </span>
									</div>
									<div className='start col'>
										<Button
											buttonText='Delete Author'
											handleClick={handleDeleteAuthor}
										/>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateCourse;
