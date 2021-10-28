import React, { useRef, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { Button, Input } from '../../common/index';

import { pipeDuration } from 'helpers/pipeDuration';
import { addCourse, updateCourse } from 'store/courses/actionCreators';
import { addAuthor } from 'store/authors/actionCreators';
import { AuthorList, CourseAuthorList } from './AuthorList';

import {
	BACK_TO_THE_COURSE,
	TITLE_PLACEHOLDER,
	TITLE,
	UPDATE_COURSE,
	CREATE_COURSE,
	DESCRIPTION_PLACEHOLDER,
	HEADER_ADD_AUTHORS,
	AUTHOR_NAME_PLACEHOLDER,
	CREATE_AUTHOR,
	HEADER_AUTHORS,
	DURATION,
	DURATION_PLACEHOLDER,
	HEADER_COURSE_AUTHORS,
} from '../../utils/constants';

const CourseForm = ({ courses, authors, key }) => {
	const [finished, setFinished] = useState(false);

	const dispatch = useDispatch();
	const pathParam = useParams();
	const editCourseId = Object.values(pathParam).join();
	const editCourse = courses.find((course) => course.id === editCourseId);
	const editCourseAuthors = editCourse
		? editCourse.authors.map((element) =>
				authors.find((author) => author.id === element)
		  )
		: [];

	const [courseAuthor, setCourseAuthor] = useState(
		editCourse ? editCourseAuthors : []
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
			dispatch(addAuthor(newAuthor));
		}
	};

	const saveCourseClickHandler = (e) => {
		e.preventDefault();
		const title = titleInput.current.value;
		const description = descriptionInput.current.value;
		const duration = durationInput.current.value;

		if (
			!title ||
			description.length < 2 ||
			+duration < 1 ||
			courseAuthor.length < 1
		) {
			alert('Please, fill in all fields');
		} else {
			const authorId = courseAuthor.map((author) => author.id);
			const newCourse = {
				id: editCourse ? editCourse.id : (key = uuidv4()),
				title: title,
				creationDate: editCourse
					? editCourse.creationDate
					: new Date().toLocaleDateString(),
				description: description,
				authors: authorId,
				duration: +duration,
			};

			editCourse
				? dispatch(updateCourse(newCourse))
				: dispatch(addCourse(newCourse));

			setFinished(true);
		}
	};

	const [durationValue, setDurationValue] = useState(
		editCourse ? editCourse.duration : ''
	);
	const durationHandleChanger = (e) => {
		const duration = e.target.value;
		setDurationValue(duration);
	};

	if (finished) {
		return <Redirect to='/courses' />;
	}

	return (
		<div
			data-testid='courseForm'
			className='alert alert-info border border-primary border-1 rounded-1 p-3 my-3'
		>
			<div className='row mx-0'>
				<div className='mb-3'>
					<Link to='/courses'>
						<Button
							size={{ width: '200px' }}
							clickHandler={undefined}
							text={BACK_TO_THE_COURSE}
							icon={undefined}
						/>
					</Link>
				</div>
				<div className='col'>
					<Input
						ref={titleInput}
						placeholderText={TITLE_PLACEHOLDER}
						changeHandler={undefined}
						defaultValue={editCourse ? editCourse.title : ''}
						name={undefined}
						text={TITLE}
					/>
				</div>
				<div className='col d-flex justify-content-end'>
					<Button
						clickHandler={saveCourseClickHandler}
						text={editCourse ? UPDATE_COURSE : CREATE_COURSE}
						icon={undefined}
					/>
				</div>
			</div>
			<div className='row p-2 my-3 rounded-1 bg-light mx-2'>
				<p>Description</p>
				<textarea
					ref={descriptionInput}
					defaultValue={editCourse ? editCourse.description : ''}
					style={{ height: '100px' }}
					className='border border-secondary border-1 form-control'
					placeholder={DESCRIPTION_PLACEHOLDER}
				/>
			</div>
			<div className='bg-light border border-dark border-1 rounded-1 p-4 mx-2'>
				<div className='row'>
					<div className='col' data-testid='addAuthor'>
						<h5 className='text-center bg-info bg-opacity-20 rounded-1 p-2 mb-3'>
							{HEADER_ADD_AUTHORS}
						</h5>
						<Input
							ref={authorInput}
							placeholderText={AUTHOR_NAME_PLACEHOLDER}
							defaultValue={''}
							name='author_input'
							changeHandler={undefined}
							text={undefined}
						/>
						<div data-testid='addNewAuthor' className='col p-2 text-center'>
							<Button
								text={CREATE_AUTHOR}
								clickHandler={saveAuthorClickHandler}
								icon={undefined}
							/>
						</div>
					</div>
					<div data-testid='authorList' className='col'>
						<h5 className='text-center bg-info bg-opacity-20 rounded-1 p-2'>
							{HEADER_AUTHORS}
						</h5>
						<div className='p-2'>
							<AuthorList
								authors={authors}
								courseAuthor={courseAuthor}
								setCourseAuthor={setCourseAuthor}
							/>
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<h5 className='text-center bg-info bg-opacity-20 rounded-1 p-2 mb-3'>
							{DURATION}
						</h5>
						<Input
							ref={durationInput}
							type='number'
							defaultValue={editCourse ? `${editCourse.duration}` : ''}
							changeHandler={durationHandleChanger}
							placeholderText={DURATION_PLACEHOLDER}
							name={undefined}
							text={DURATION}
						/>
						<h4 className='text-center'>
							{DURATION} {pipeDuration(+durationValue)}
						</h4>
					</div>
					<div className='col'>
						<h5 className='text-center bg-info bg-opacity-20 rounded-1 p-2'>
							{HEADER_COURSE_AUTHORS}
						</h5>
						<div>
							<CourseAuthorList
								courseAuthor={courseAuthor}
								setCourseAuthor={setCourseAuthor}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

CourseForm.propTypes = {
	courses: PropTypes.array,
	authors: PropTypes.array,
	key: PropTypes.any,
};

// @ts-ignore
export default connect(({ authors, courses }) => ({
	courses,
	authors,
}))(CourseForm);
