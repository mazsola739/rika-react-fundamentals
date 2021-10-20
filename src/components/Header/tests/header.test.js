import React from 'react';
import Header from 'components/Header/Header';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
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
afterEach(() => {
	cleanup();
});
describe('Header', () => {
	beforeEach(() => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<Header />
				</BrowserRouter>
			</Provider>
		);
	});

	it('should have logo', () => {
		const logoElement = screen.getByTestId('logo');
		expect(logoElement).toBeInTheDocument();
		expect(logoElement).toHaveTextContent('Courses');
	});

	it('should display button and name.', () => {
		const userNameElement = screen.getByTestId('name');
		const buttonElement = screen.getByText('Logout');
		expect(userNameElement).toHaveTextContent(TEST_USER.name);
		expect(userNameElement).toBeInTheDocument();
		expect(buttonElement).toBeInTheDocument();
	});
});
