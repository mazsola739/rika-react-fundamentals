import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createStoreForTesting } from 'App';

import Courses from 'components/Courses/Courses';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import PrivateRoute from 'components/PrivateRouter/PrivateRouter';
import CourseForm from 'components/CourseForm/CourseForm';

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

describe('Courses', () => {
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
	});
	it('should display amount of CourseCard equal length of courses array', () => {
		const coursesLength = store.getState().courses.length;
		const cardElement = screen.getAllByTestId('card');
	});

	it('should display Empty container if courses array length is 0', () => {
		const coursesLength = store.getState().courses.length;
		const cardElement = screen.getAllByTestId('card');
	});

	it('`should be showed after a click on a button "Add new course"`', () => {
		const addButtonElement = screen.getByTestId('addCourseButton');
		fireEvent.click(addButtonElement);
		const courseFormElement = screen.getByTestId('courseForm');
		expect(courseFormElement).toBeInTheDocument();
	});
});
