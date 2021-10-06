import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { v4 as uuidv4 } from 'uuid';
import { formatDuration } from 'utilities/durationFormatter';
import { connect, useDispatch } from 'react-redux';
import { saveAuthor } from 'store/authors/actionCreators';
import { saveCourse } from 'store/courses/actionCreators';
import { saveNewAuthor } from 'services/authors';
import { saveNewCourse } from 'services/courses';

const CreateCourse = ({ authors, key }) => {
	const [titleValue, setTitleValue] = useState('');
	const [descriptionValue, setDescriptionValue] = useState('');
	const [authorValue, setAuthorValue] = useState('');
	const [durationValue, setDurationValue] = useState('');
	const [allAuthors, setAllAuthors] = useState(authors);
	const [courseAuthor, setCourseAuthor] = useState([]);
	const [finished, setFinished] = useState(false);
	const dispatch = useDispatch();

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

	const saveAuthorClickHandler = (e) => {
		e.preventDefault();
		if (authorValue.length >= 2) {
			const newAuthor = {
				id: (key = uuidv4()),
				name: authorValue,
			};
			saveNewAuthor(newAuthor);
			setAllAuthors([...allAuthors, newAuthor]);
			dispatch(saveAuthor(newAuthor));
		}
	};
	const saveCourseClickHandler = (e) => {
		e.preventDefault();
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
				id: (key = uuidv4()),
				title: titleValue,
				creationDate: new Date().toLocaleDateString(),
				description: descriptionValue,
				authors: authorId,
				duration: +durationValue,
			};
			saveNewCourse(newCourse);
			dispatch(saveCourse({ newCourse }));
			setFinished(true);
		}
		<Redirect to='/courses' />;
	};

	if (finished === true) {
		return <Redirect to='/courses' />;
	}

	return (
		<div className='alert alert-info border border-primary border-1 rounded-1 p-3 my-3'>
			<div className='row mx-0'>
				<div className='mb-3'>
					<Link to='/courses'>
						<Button
							size={{ width: '200px' }}
							clickHandler={undefined}
							text='&lt; Back to courses'
							icon={undefined}
						/>
					</Link>
				</div>
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
						clickHandler={saveCourseClickHandler}
						text='Create course'
						icon={undefined}
					/>
				</div>
			</div>
			<div className='row p-2 my-3 rounded-1 bg-light mx-2'>
				<p>Description</p>
				<textarea
					value={descriptionValue}
					onChange={descriptionHandleChanger}
					style={{ height: '100px' }}
					className='border border-secondary border-1 form-control'
					placeholder='Enter description'
				/>
			</div>
			<div className='bg-light border border-dark border-1 rounded-1 p-4 mx-2'>
				<div className='row'>
					<div className='col'>
						<h5 className='text-center bg-info bg-opacity-20 rounded-1 p-2 mb-3'>
							Add Authors
						</h5>

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
								clickHandler={saveAuthorClickHandler}
								icon={undefined}
							/>
						</div>
					</div>
					<div className='col'>
						<h5 className='text-center bg-info bg-opacity-20 rounded-1 p-2'>
							Authors
						</h5>
						<div className='p-2'>
							{
								//authors
								allAuthors
									.filter(
										(author) =>
											!courseAuthor.some((item) => author.id === item.id)
									)
									.map(({ name, id }) => (
										<div className='row p-1' key={id}>
											<div className='text-end col'>
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
														allAuthors.filter((author) =>
															courseAuthor.includes(author.id)
														);
													}}
													icon={undefined}
												/>
											</div>
										</div>
									))
							}
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<h5 className='text-center bg-info bg-opacity-20 rounded-1 p-2 mb-3'>
							Duration
						</h5>
						<Input
							type='number'
							value={durationValue}
							changeHandler={durationHandleChanger}
							placeholderText='Enter duration in minutes...'
							name={undefined}
							text='Duration'
						/>
						<h4 className='text-center'>
							<b>Duration {formatDuration(durationValue)}</b>
						</h4>
					</div>
					<div className='col'>
						<h5 className='text-center bg-info bg-opacity-20 rounded-1 p-2'>
							Course authors
						</h5>
						<div>
							{courseAuthor.length ? (
								courseAuthor.map(({ name, id }) => (
									<div className='row p-1' key={id}>
										<div className='text-end col'>
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
								<div className='text-center'>
									<em>
										<small>Author list is empty</small>
									</em>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

CreateCourse.propTypes = {
	authors: PropTypes.array,
	key: PropTypes.any,
};

// @ts-ignore
export default connect(({ authors }) => ({
	authors,
}))(CreateCourse);
