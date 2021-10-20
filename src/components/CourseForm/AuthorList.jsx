import React from 'react';
import Button from 'components/Button/Button';

export const AuthorList = ({ authors, courseAuthor, setCourseAuthor }) => {
	//const addNewAuthorToCourse = ;

	const allAuthors = (authorList) => {
		return authorList.filter(
			(author) => !courseAuthor.some((item) => author.id === item.id)
		);
	};

	return allAuthors(authors).map(({ name, id }) => (
		<div data-testid={id} className='row p-1' key={id}>
			<div className='text-end col'>
				<span>{name} </span>
			</div>
			<div className='start col'>
				<Button
					text='Add Author'
					clickHandler={() => {
						setCourseAuthor((authors) => [...authors, { name: name, id: id }]);
						authors.filter((author) => courseAuthor.includes(author.id));
					}}
					icon={undefined}
				/>
			</div>
		</div>
	));
};

export const CourseAuthorList = ({ courseAuthor, setCourseAuthor }) => {
	//const deleteAuthorFromCourse = ;

	return courseAuthor.length ? (
		courseAuthor.map(({ name, id }) => (
			<div data-testid={id} className='row p-1' key={id}>
				<div className='text-end col'>
					<span>{name} </span>
				</div>
				<div className='start col'>
					<Button
						text='Delete Author'
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
