import React, { useRef, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { v4 as uuidv4 } from 'uuid';
//import { formatDuration } from 'utilities/durationFormatter';
import { connect, useDispatch } from 'react-redux';
import { saveCourse, updateCourse } from 'store/courses/actionCreators';
import { saveAuthor } from 'store/authors/actionCreators';

const CourseForm = ({ courses, authors, key }) => {
	const [finished, setFinished] = useState(false);

	const dispatch = useDispatch();
	const pathParam = useParams();
	const thisCourseId = Object.values(pathParam).join();
	const thisCourse = courses.find((course) => course.id === thisCourseId);
	const thisCourseAuthors = thisCourse
		? thisCourse.authors.map((element) =>
				authors.find((author) => author.id === element)
		  )
		: [];

	const [courseAuthor, setCourseAuthor] = useState(
		thisCourse ? thisCourseAuthors : []
	);

	const titleInput = useRef(null);
	const descriptionInput = useRef(null);
	const durationInput = useRef(null);
	const authorInput = useRef(null);

	const saveAuthorClickHandler = (e) => {
		e.preventDefault();
		const author = authorInput.current.value;

		if (author.length >= 2) {
			const newAuthor = {
				name: author,
			};
			dispatch(saveAuthor(newAuthor));
		}
	};
	const saveCourseClickHandler = async (e) => {
		e.preventDefault();
		const title = titleInput.current.value;
		const description = descriptionInput.current.value;
		const duration = durationInput.current.value;

		if (
			!title ||
			description.length < 2 ||
			+duration < 0 ||
			courseAuthor.length < 1
		) {
			alert('Please, fill in all fields');
		} else {
			const authorId = courseAuthor.map((author) => author.id);
			const newCourse = {
				id: thisCourse ? thisCourse.id : (key = uuidv4()),
				title: title,
				creationDate: thisCourse
					? thisCourse.creationDate
					: new Date().toLocaleDateString(),
				description: description,
				authors: authorId,
				duration: +duration,
			};

			thisCourse
				? await dispatch(updateCourse(newCourse))
				: dispatch(saveCourse(newCourse));

			setFinished(true);
		}
	};
	const [durationValue, setDurationValue] = useState('');
	const durationHandleChanger = (e) => {
		const duration = e.target.value;
		setDurationValue(duration);
	};

	if (finished) {
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
						ref={titleInput}
						placeholderText='Enter title...'
						changeHandler={undefined}
						defaultValue={thisCourse ? thisCourse.title : ''}
						name={undefined}
						text='Title'
					/>
				</div>
				<div className='col d-flex justify-content-end'>
					<Button
						clickHandler={saveCourseClickHandler}
						text={thisCourse ? 'Update course' : 'Create course'}
						icon={undefined}
					/>
				</div>
			</div>
			<div className='row p-2 my-3 rounded-1 bg-light mx-2'>
				<p>Description</p>
				<textarea
					ref={descriptionInput}
					defaultValue={thisCourse ? thisCourse.description : ''}
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
							ref={authorInput}
							placeholderText='Enter author name...'
							changeHandler={undefined}
							defaultValue={''}
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
							{authors
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
						<h5 className='text-center bg-info bg-opacity-20 rounded-1 p-2 mb-3'>
							Duration
						</h5>
						<Input
							ref={durationInput}
							type='number'
							defaultValue={thisCourse ? `${thisCourse.duration}` : ''}
							changeHandler={durationHandleChanger}
							placeholderText='Enter duration in minutes...'
							name={undefined}
							text='Duration'
						/>
						<h4 className='text-center'>Duration {durationValue}</h4>
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

CourseForm.propTypes = {
	authors: PropTypes.array,
	key: PropTypes.any,
};

// @ts-ignore
export default connect(({ authors, courses }) => ({
	courses,
	authors,
}))(CourseForm);
