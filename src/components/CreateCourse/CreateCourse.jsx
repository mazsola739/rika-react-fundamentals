import React, { useRef, useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { v4 as uuidv4 } from 'uuid';

const textareaStyle = {
	height: '100px',
};

const CreateCourse = ({
	backToCourse,
	setCards,
	cards,
	authors,
	key,
	setAuthors,
}) => {
	const [courseAuthor, setCourseAuthor] = useState([]);
	const [durationValue, setDurationValue] = useState('');

	const inputTitleRef = useRef();
	const inputDescriptionRef = useRef();
	const inputAuthorRef = useRef();

	const handleChangeDuration = (e) => {
		const duration = e.target.value;
		setDurationValue(() => duration);
	};

	const displayDuration = (inputvalue) => {
		let hours = Math.floor(inputvalue / 60);
		let minutes = inputvalue % 60;
		return `${hours < 10 ? '0' + hours : hours}:${
			minutes < 10 ? '0' + minutes : minutes
		}`;
	};

	const handleClickCreateAuthor = (e) => {
		e.preventDefault();
		const newAuthorName = inputAuthorRef.current.value;
		if (newAuthorName.length >= 2) {
			const newAuthorUuid = (key = uuidv4());
			const newAuthors = {
				id: newAuthorUuid,
				name: newAuthorName,
			};
			setAuthors([...authors, newAuthors]);
		}
	};

	const saveNewCourse = (e) => {
		e.preventDefault();
		const newTitle = inputTitleRef.current.value;
		const newDescription = inputDescriptionRef.current.value;
		const newDuration = durationValue;
		const newCourseUuid = (key = uuidv4());
		const newCreationDate = new Date().toLocaleDateString();

		if (
			!newTitle ||
			newDescription.length < 2 ||
			!newDuration ||
			courseAuthor
		) {
			alert('Please, fill in all fields');
		} else {
			const newCourse = {
				id: newCourseUuid,
				title: newTitle,
				creationDate: newCreationDate,
				description: newDescription,
				authors: [courseAuthor.map((author) => author.name)],
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
						type='text'
						ref={inputTitleRef}
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
							{authors
								.filter(
									(author) =>
										!courseAuthor.some((item) => {
											return author.id === item.id;
										})
								)
								.map((author) => (
									<div className='row' key={author.id} id={author.id}>
										<div className='start col'>
											<span>{author.name} </span>
										</div>
										<div className='start col'>
											<Button
												id={author.id}
												buttonText='Add Author'
												handleClick={() => {
													setCourseAuthor((authors) => [
														...authors,
														{ name: author.name, id: author.id },
													]);
													authors.filter((author) =>
														courseAuthor.includes(author.id)
													);
												}}
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
							type='number'
							value={durationValue}
							changeHandler={handleChangeDuration}
							inputId='inputDuration'
							placeholderText='Enter duration in minutes...'
						/>
						<p>
							Duration <b>{displayDuration(durationValue)}</b> hours
						</p>
					</div>
					<div className='col'>
						<h5 className='text-center'>Course authors</h5>
						<div className='text-center'>
							{courseAuthor.length ? (
								courseAuthor.map((author) => (
									<div className='row' key={author.id} id={author.id}>
										<div className='start col'>
											<span>{author.name} </span>
										</div>
										<div className='start col'>
											<Button
												id={author.id}
												buttonText='Delete Author'
												handleClick={() =>
													setCourseAuthor((prevCourseAuthors) =>
														prevCourseAuthors.filter(
															(item) => author.id !== item.id
														)
													)
												}
											/>
										</div>
									</div>
								))
							) : (
								<span>Author list is empty</span>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateCourse;
