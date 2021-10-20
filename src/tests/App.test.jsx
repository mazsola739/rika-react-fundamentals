import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createStoreForTesting } from 'App';
import CourseForm from 'components/CourseForm/CourseForm';
import Courses from 'components/Courses/Courses';
import Header from 'components/Header/Header';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import PrivateRoute from 'components/PrivateRouter/PrivateRouter';

afterAll(() => {
	cleanup();
});

describe(`Rika's App`, () => {
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

	describe('Courses', () => {
		beforeEach(() => {
			const isAuthenticated = () => true;
			render(
				<Provider store={store}>
					<BrowserRouter>
						<PrivateRoute
							component={Courses}
							isAuthenticated={isAuthenticated}
						/>
					</BrowserRouter>
				</Provider>
			);
		});

		it('should display amount of CourseCard equal length of courses array', () => {
			const coursesLength = store.getState().courses.length;
			const cardElement = screen.getAllByTestId('card');
			expect(cardElement.length).toEqual(coursesLength);
		});
		it('should display Empty container if courses array length is empty', () => {
			const coursesLength = store.getState().courses.length;
			const cardElement = screen.getAllByTestId('card');
			expect(cardElement.length).toEqual(coursesLength);
		});
	});

	describe('CourseCard', () => {
		beforeEach(() => {
			const isAuthenticated = () => true;
			render(
				<Provider store={store}>
					<BrowserRouter>
						<PrivateRoute
							component={Courses}
							isAuthenticated={isAuthenticated}
						/>
					</BrowserRouter>
				</Provider>
			);
		});

		it('should display title', () => {
			const titleElement = screen.getByTestId('title');
			expect(titleElement).toBeInTheDocument();
			expect(titleElement).toHaveTextContent(TEST_COURSE1.title);
		});

		it('should display description', () => {
			const descriptionElement = screen.getByTestId('description');
			expect(descriptionElement).toBeInTheDocument();
			expect(descriptionElement).toHaveTextContent(TEST_COURSE1.description);
		});

		it('should display piped duration', () => {
			const durationElement = screen.getByTestId('duration');
			expect(durationElement).toBeInTheDocument();
			expect(durationElement).toHaveTextContent(`${TEST_COURSE1.duration}`);
		});

		it('should display authors list', () => {
			const authorsElement = screen.getByTestId('authorsList');
			expect(authorsElement).toBeInTheDocument();
		});

		it('should display created date', () => {
			const creationDateElement = screen.getByTestId('created');
			expect(creationDateElement).toBeInTheDocument();
			expect(creationDateElement).toHaveTextContent(TEST_COURSE1.creationDate);
		});
	});

	describe('CourseForm', () => {
		beforeEach(() => {
			const isAuthenticated = () => true;
			render(
				<Provider store={store}>
					<BrowserRouter>
						<PrivateRoute
							component={Courses}
							isAuthenticated={isAuthenticated}
						/>
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

		it('should show after a click on a button "Add new course"', () => {
			const courseFormElement = screen.getByTestId('courseForm');
			expect(courseFormElement).toBeInTheDocument();
		});

		it('should show authors list', () => {
			const authorListElement = screen.getByTestId('authorList');
			expect(authorListElement).toBeInTheDocument();
		});

		it('add an author to all authors list', () => {
			const addNewAuthorElement = screen.getByTestId('addNewAuthor');
			fireEvent.click(addNewAuthorElement);
		});
		it('add an author to course authors list', () => {
			const addToCourseButtonElement = screen.getByTestId(`${TEST_AUTHOR1.id}`);
			fireEvent.click(addToCourseButtonElement);
		});

		it('delete an author from course authors list', () => {
			const deleteFromCourseButtonElement = screen.getByTestId(
				`${TEST_AUTHOR1.id}`
			);
			fireEvent.click(deleteFromCourseButtonElement);
		});
	});
});
