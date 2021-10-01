import React, { useState } from 'react';
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

const formatDuration = (duration) => {
	const hours = Math.floor(duration / 60);
	const minutes = duration % 60;
	const displayDuration = `${hours < 10 ? '0' + hours : hours}:${
		minutes < 10 ? '0' + minutes : minutes
	} hours`;
	return displayDuration;
};

const textareaStyle = {
	height: '100px',
};

const CreateCourse = ({ store, key }) => {
	const [titleValue, setTitleValue] = useState('');
	const [descriptionValue, setDescriptionValue] = useState('');
	const [authorValue, setAuthorValue] = useState('');
	const [courseAuthor, setCourseAuthor] = useState([]);
	const [durationValue, setDurationValue] = useState('');
	const [finished, setFinished] = useState(false);

	const authors = store.getState().authors;

	const titleHandleChanger = (e) => {
		const title = e.target.value;
		setTitleValue(() => title);
	};
	const descriptionHandleChanger = (e) => {
		const description = e.target.value;
		setDescriptionValue(() => description);
	};
	const durationHandleChanger = (e) => {
		const duration = e.target.value;
		setDurationValue(() => duration);
	};
	const authorHandleChanger = (e) => {
		const author = e.target.value;
		setAuthorValue(() => author);
	};

	const saveNewAuthor = (e) => {
		e.preventDefault();
		if (authorValue.length >= 2) {
			const authorId = (key = uuidv4());
			const newAuthor = {
				id: authorId,
				name: authorValue,
			};
			getApiService().post('/authors/add', newAuthor);
		}
	};
	const saveNewCourse = (e) => {
		e.preventDefault();
		const courseId = (key = uuidv4());
		const creationDate = new Date().toLocaleDateString();

		if (
			!titleValue ||
			descriptionValue.length < 2 ||
			+durationValue < 0 ||
			courseAuthor.length < 1
		) {
			alert('Please, fill in all fields');
		} else {
			const authorId = courseAuthor.map((author) => author.id);
			const newCourse = {
				id: courseId,
				title: titleValue,
				creationDate: creationDate,
				description: descriptionValue,
				authors: authorId,
				duration: +durationValue,
			};

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
						placeholderText='Enter title...'
						changeHandler={titleHandleChanger}
						value={titleValue}
						name={undefined}
						text='Title'
					/>
				</div>
				<div className='col d-flex justify-content-end'>
					<Button
						clickHandler={saveNewCourse}
						text='Create course'
						icon={undefined}
					/>
				</div>
			</div>
			<div className='row p-2 my-3'>
				<p>Description</p>
				<textarea
					value={descriptionValue}
					onChange={descriptionHandleChanger}
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
							placeholderText='Enter author name...'
							changeHandler={authorHandleChanger}
							value={authorValue}
							name={undefined}
							text='Author name'
						/>
						<div className='col p-2 text-center'>
							<Button
								text='Create author'
								clickHandler={saveNewAuthor}
								icon={undefined}
							/>
						</div>
					</div>
					<div className='col'>
						<h5 className='text-center'>Authors</h5>
						<div className='text-center'>
							{authors
								.filter(
									(author) =>
										!courseAuthor.some((item) => author.id === item.id)
								)
								.map(({ name, id }) => (
									<div className='row' key={id}>
										<div className='start col'>
											<span>{name} </span>
										</div>
										<div className='start col'>
											<Button
												text='Add Author'
												clickHandler={() => {
													setCourseAuthor((authors) => [
														...authors,
														{ name: name, id: id },
													]);
													authors.filter((author) =>
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
							type='number'
							value={durationValue}
							changeHandler={durationHandleChanger}
							placeholderText='Enter duration in minutes...'
							name={undefined}
							text='Duration'
						/>
						<p>
							Duration <b>{formatDuration(durationValue)}</b> hours
						</p>
					</div>
					<div className='col'>
						<h5 className='text-center'>Course authors</h5>
						<div className='text-center'>
							{courseAuthor.length ? (
								courseAuthor.map(({ name, id }) => (
									<div className='row' key={id}>
										<div className='start col'>
											<span>{name} </span>
										</div>
										<div className='start col'>
											<Button
												text='Delete Author'
												clickHandler={() =>
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
};

export default CreateCourse;
