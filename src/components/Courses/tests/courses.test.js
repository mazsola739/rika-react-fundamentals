import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createStoreForTesting } from 'App';

import PrivateRoute from 'components/PrivateRouter/PrivateRouter';
import { CourseForm, Courses } from 'components';

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
let store = createStoreForTesting({
	user: TEST_USER,
	authors: [TEST_AUTHOR1, TEST_AUTHOR2],
	courses: [TEST_COURSE1],
});

const testRendering = (store) => {
	const isAuthenticated = () => true;
	render(
		<Provider store={store}>
			<BrowserRouter>
				<PrivateRoute component={Courses} isAuthenticated={isAuthenticated} />
			</BrowserRouter>
		</Provider>
	);
};
afterEach(() => cleanup());

describe('Courses', () => {
	it('should display amount of CourseCard equal length of courses array', () => {
		testRendering(store);
		const coursesList = screen.getByTestId('cards');
		const cardElement = screen.getByTestId(`${TEST_COURSE1.id}`);
		expect(coursesList).toContainElement(cardElement);
	});

	it('should display Empty container if courses array length is 0', () => {
		store = createStoreForTesting({});
		testRendering(store);
		const coursesList = screen.getByTestId('cards');
		expect(coursesList).toBeEmptyDOMElement();
	});

	it(`CourseForm should be showed after a click on a button "Add new course"`, () => {
		store = createStoreForTesting({
			user: TEST_USER,
			authors: [TEST_AUTHOR1, TEST_AUTHOR2],
			courses: [TEST_COURSE1],
		});
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
		const addButtonElement = screen.getByTestId('addCourseButton');
		fireEvent.click(addButtonElement);
		const courseFormComponent = screen.getByTestId('courseForm');
		expect(courseFormComponent).toBeInTheDocument();
	});
});
