import React from 'react';
import { Button } from 'common';
import { ADD_AUTHOR, DELETE_AUTHOR } from '../../utils/constants';

export const AuthorList = ({ authors, courseAuthor, setCourseAuthor }) => {
	/* const addNewAuthorToCourse = () => {
		setCourseAuthor((authors) => [...authors, { name: name, id: id }]);
		authors.filter((author) => courseAuthor.includes(author.id));
	}; */

	const selectAuthor = (author) =>
		courseAuthor.some((auth) => author.id === auth.id);
	const allAuthors = (authorList) =>
		authorList.filter((author) => !selectAuthor(author));

	const filteredAuthors = (authors) =>
		authors.filter((author) => courseAuthor.includes(author.id));

	return allAuthors(authors).map(({ name, id }) => (
		<div className='row p-1' key={id}>
			<div className='text-end col'>
				<span>{name} </span>
			</div>
			<div data-testid={id} className='start col'>
				<Button
					text={ADD_AUTHOR}
					clickHandler={() => {
						setCourseAuthor((authors) => [...authors, { name: name, id: id }]);
						filteredAuthors(authors);
					}}
					icon={undefined}
				/>
			</div>
		</div>
	));
};

export const CourseAuthorList = ({ courseAuthor, setCourseAuthor }) => {
	/* const deleteAuthorFromCourse = () => {
		setCourseAuthor((prevCourseAuthors) =>
			prevCourseAuthors.filter((item) => id !== item.id)
		);
	}; */

	return courseAuthor.length ? (
		courseAuthor.map(({ name, id }) => (
			<div className='row p-1' key={id}>
				<div className='text-end col'>
					<span>{name} </span>
				</div>
				<div data-testid={name} className='start col'>
					<Button
						text={DELETE_AUTHOR}
						clickHandler={() => {
							setCourseAuthor((prevCourseAuthors) =>
								prevCourseAuthors.filter((item) => id !== item.id)
							);
						}}
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
	);
};
