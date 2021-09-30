import React, { useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const getApiService = () => {
	const token = localStorage.getItem('token');
	return axios.create({
		baseURL: 'http://localhost:3000',
		headers: { 'Content-type': 'application/json', Authorization: token },
	});
};

const textareaStyle = {
	height: '100px',
};

const CreateCourse = ({ cards, authorNames, setAuthors, setCards, key }) => {
	const [courseAuthor, setCourseAuthor] = useState([]);
	const [durationValue, setDurationValue] = useState('');
	const [finished, setFinished] = useState(false);

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
		// @ts-ignore
		const newAuthorName = inputAuthorRef.current.value;
		if (newAuthorName.length >= 2) {
			const newAuthorUuid = (key = uuidv4());
			const newAuthor = {
				id: newAuthorUuid,
				name: newAuthorName,
			};
			setAuthors([...authorNames, newAuthor]);
			getApiService().post('/authors/add', newAuthor);
		}
	};

	const saveNewCourse = (e) => {
		e.preventDefault();
		// @ts-ignore
		const newTitle = inputTitleRef.current.value;
		// @ts-ignore
		const newDescription = inputDescriptionRef.current.value;
		const newDuration = +durationValue;
		const newCourseUuid = (key = uuidv4());
		const newCreationDate = new Date().toLocaleDateString();

		if (
			!newTitle ||
			newDescription.length < 2 ||
			newDuration < 0 ||
			courseAuthor.length < 1
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
			getApiService().post('/courses/add', newCourse);
			setFinished(true);
		}
		<Redirect to='/courses' />;
	};

	if (finished === true) {
		return <Redirect to='/courses' />;
	}

	return (
		<div className='bg-primary bg-opacity-10 border border-primary border-2 rounded-1 p-3 my-3'>
			<div className='row'>
				<div className='col'>
					<Input
						ref={inputTitleRef}
						inputId='inputTitle'
						placeholderText='Enter title...'
						changeHandler={undefined}
						inputValue={undefined}
						inputName={undefined}
						labelText='Title'
					/>
				</div>
				<div className='col d-flex justify-content-end'>
					<Button
						buttonClickHandler={saveNewCourse}
						buttonText='Create course'
						icon={undefined}
					/>
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
			<div className='bg-dark bg-opacity-10 border border-dark border-2 rounded-1 p-2'>
				<div className='row'>
					<div className='col'>
						<h5 className='text-center'>Add Authors</h5>

						<Input
							inputId='inputAuthor'
							ref={inputAuthorRef}
							placeholderText='Enter author name...'
							changeHandler={undefined}
							inputValue={undefined}
							inputName={undefined}
							labelText='Author name'
						/>
						<div className='col p-2 text-center'>
							<Button
								buttonText='Create author'
								buttonClickHandler={handleClickCreateAuthor}
								icon={undefined}
							/>
						</div>
					</div>
					<div className='col'>
						<h5 className='text-center'>Authors</h5>
						<div className='text-center'>
							{authorNames
								.filter(
									(author) =>
										!courseAuthor.some((item) => author.id === item.id)
								)
								.map(({ name, id }) => (
									<div className='row' key={id} id={id}>
										<div className='start col'>
											<span>{name} </span>
										</div>
										<div className='start col'>
											<Button
												buttonText='Add Author'
												buttonClickHandler={() => {
													setCourseAuthor((authors) => [
														...authors,
														{ name: name, id: id },
													]);
													authorNames.filter((author) =>
														courseAuthor.includes(author.id)
													);
												}}
												icon={undefined}
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
						<Input
							inputType='number'
							inputValue={durationValue}
							changeHandler={handleChangeDuration}
							inputId='inputDuration'
							placeholderText='Enter duration in minutes...'
							inputName={undefined}
							labelText='Duration'
						/>
						<p>
							Duration <b>{displayDuration(durationValue)}</b> hours
						</p>
					</div>
					<div className='col'>
						<h5 className='text-center'>Course authors</h5>
						<div className='text-center'>
							{courseAuthor.length ? (
								courseAuthor.map(({ name, id }) => (
									<div className='row' key={id} id={id}>
										<div className='start col'>
											<span>{name} </span>
										</div>
										<div className='start col'>
											<Button
												buttonText='Delete Author'
												buttonClickHandler={() =>
													setCourseAuthor((prevCourseAuthors) =>
														prevCourseAuthors.filter((item) => id !== item.id)
													)
												}
												icon={undefined}
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

CreateCourse.propTypes = {
	backToCourse: PropTypes.any,
	setCards: PropTypes.any,
	cards: PropTypes.any,
	authors: PropTypes.any,
	setAuthors: PropTypes.any,
};

export default CreateCourse;
