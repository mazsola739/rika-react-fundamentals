import React from 'react';
import CourseForm from '../CourseForm';
import PrivateRoute from 'components/PrivateRouter/PrivateRouter';
import Courses from 'components/Courses/Courses';
import { Provider } from 'react-redux';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createStoreForTesting } from 'App';
import { BrowserRouter } from 'react-router-dom';

beforeEach(() => {
	cleanup();
});

const TEST_USER = {
	isAuth: true,
	name: 'Admin',
	email: 'admin@email.com',
	token: 'test-token',
};
const TEST_COURSE1 = {
	id: 'courseId1',
	title: 'courseTitle',
	creationDate: 'courseCreationDate',
	description: 'courseDescription',
	authors: ['authorId1', 'authorId2'],
	duration: 42,
};
const TEST_AUTHOR1 = {
	name: 'author1',
	id: 'authorId1',
};
const TEST_AUTHOR2 = {
	name: 'author2',
	id: 'authorId2',
};

const store = createStoreForTesting({
	user: TEST_USER,
	authors: [TEST_AUTHOR1, TEST_AUTHOR2],
	courses: [TEST_COURSE1],
});

describe('CourseForm', () => {
	beforeEach(() => {
		const isAuthenticated = () => true;
		render(
			<Provider store={store}>
				<BrowserRouter>
					<PrivateRoute component={Courses} isAuthenticated={isAuthenticated} />
					<PrivateRoute
						component={CourseForm}
						isAuthenticated={isAuthenticated}
					/>
				</BrowserRouter>
			</Provider>
		);
		const addCourseButtonElement = screen.getByTestId('addCourseButton');
		fireEvent.click(addCourseButtonElement);
	});
	it('should show authors lists (all and course authors)', () => {
		const authorListElement = screen.getByTestId('authorList');
		expect(authorListElement).toBeInTheDocument();
	});
	it(`'Create author' click button should call dispatch`, () => {
		const addNewAuthorElement = screen.getByTestId('addNewAuthor');
		fireEvent.click(addNewAuthorElement);
	});
	it(`'Add author' button click should add an author to course authors list`, () => {
		const addToCourseButtonElement = screen.getByTestId(`${TEST_AUTHOR1.id}`);
		fireEvent.click(addToCourseButtonElement);
	});
	it(`'Delete author' button click should delete an author from the course list`, () => {
		const deleteFromCourseButtonElement = screen.getByTestId(
			`${TEST_AUTHOR1.id}`
		);
		fireEvent.click(deleteFromCourseButtonElement);
	});
});
