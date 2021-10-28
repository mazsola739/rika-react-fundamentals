import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import {
	cleanup,
	fireEvent,
	render,
	screen,
	within,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { CourseForm, Courses } from 'components';
import {
	createStoreForTesting,
	isAdmin,
	mockedStore,
	TEST_COURSE1,
} from 'utils/forTesting';
import PrivateRoute from 'components/routes/PrivateRoute';

const testRendering = (mockedStore) => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Route component={Courses} />
				<PrivateRoute component={CourseForm} isAdmin={isAdmin} />
			</BrowserRouter>
		</Provider>
	);
};
afterEach(() => cleanup());

describe('Courses', () => {
	it('should display amount of CourseCard equal length of courses array', () => {
		testRendering(mockedStore);
		const coursesList = screen.getByTestId('cards');
		const cardElement = screen.getByTestId(`${TEST_COURSE1.id}`);
		expect(coursesList).toContainElement(cardElement);
	});

	it('should display Empty container if courses array length is 0', () => {
		const store = createStoreForTesting({});
		testRendering(store);
		const coursesList = screen.getByTestId('cards');
		expect(coursesList).toBeEmptyDOMElement();
	});

	it(`CourseForm should be showed after a click on a button "Add new course"`, () => {
		testRendering(mockedStore);
		const addButtonElement = within(
			screen.getByTestId('addCourseButton')
		).getByTestId('button');

		fireEvent.click(addButtonElement);
		const courseFormComponent = screen.getByTestId('courseForm');
		expect(courseFormComponent).toBeInTheDocument();
	});
});
