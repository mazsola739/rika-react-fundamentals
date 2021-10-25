import React from 'react';
import { Provider } from 'react-redux';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';

import PrivateRoute from 'components/PrivateRouter/PrivateRouter';
import { CourseForm } from 'components';

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

const mockedState = {
	user: TEST_USER,
	courses: [TEST_COURSE1],
	authors: [TEST_AUTHOR1, TEST_AUTHOR2],
};
const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

describe('CourseForm', () => {
	beforeEach(() => {
		const isAuthenticated = () => true;
		render(
			<Provider
				// @ts-ignore
				store={mockedStore}
			>
				<BrowserRouter>
					<PrivateRoute
						component={CourseForm}
						isAuthenticated={isAuthenticated}
					/>
				</BrowserRouter>
			</Provider>
		);
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
		const addToCourseButtonElement = screen.getByTestId(`${TEST_AUTHOR1.id}`);
		fireEvent.click(addToCourseButtonElement);
	});
});
