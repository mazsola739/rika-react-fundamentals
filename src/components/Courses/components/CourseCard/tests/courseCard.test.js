import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { pipeDuration } from 'helpers/pipeDuration';
import { displayDate } from 'helpers/dateGenerator';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRouter/PrivateRouter';
import Courses from 'components/Courses/Courses';
import { createStoreForTesting } from 'App';

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

describe('CourseCard', () => {
	beforeEach(() => {
		const isAuthenticated = () => true;
		render(
			<Provider store={store}>
				<BrowserRouter>
					<PrivateRoute component={Courses} isAuthenticated={isAuthenticated} />
				</BrowserRouter>
			</Provider>
		);
	});

	it('should display title', () => {
		const titleElement = screen.getByTestId('title');
		expect(titleElement).toBeInTheDocument();
	});

	it('should display description', () => {
		const descriptionElement = screen.getByTestId('description');
		expect(descriptionElement).toBeInTheDocument();
	});

	it('should display duration in the correct format', () => {
		const durationElement = screen.getByTestId('duration');
		expect(durationElement).toBeInTheDocument();
		expect(pipeDuration(1)).toBe('00:01 hours');
		expect(pipeDuration(120)).toBe('02:00 hours');
	});

	it('should display authors list', () => {
		const authorsElement = screen.getByTestId('authorsList');
		expect(authorsElement).toBeInTheDocument();
	});

	it('should display created date in the correct format', () => {
		const creationDateElement = screen.getByTestId('created');
		expect(creationDateElement).toBeInTheDocument();
		expect(displayDate('10/10/2010')).toBe('10.10.2010');
	});
});
