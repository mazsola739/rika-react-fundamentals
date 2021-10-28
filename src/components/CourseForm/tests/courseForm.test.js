import React from 'react';
import { Provider } from 'react-redux';

import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
	within,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';

import { CourseForm } from 'components';
import { isAdmin, mockedStore, TEST_AUTHOR1 } from '../../../utils/forTesting';
import PrivateRoute from 'components/routes/PrivateRoute';

beforeEach(() => {
	cleanup();
});

describe('CourseForm', () => {
	beforeEach(() => {
		render(
			<Provider
				// @ts-ignore
				store={mockedStore}
			>
				<BrowserRouter>
					<PrivateRoute component={CourseForm} isAdmin={isAdmin} />
				</BrowserRouter>
			</Provider>
		);
	});
	it('should show authors lists (all and course authors)', () => {
		const authorListElement = screen.getByTestId('authorList');
		expect(authorListElement).toBeInTheDocument();
	});

	it(`'Create author' click button should call dispatch`, () => {
		const addNewAuthorButtonElement = within(
			screen.getByTestId('addNewAuthor')
		).getByTestId('button');
		const authorInputElement = within(
			screen.getByTestId('addAuthor')
		).getByTestId('input');
		fireEvent.change(authorInputElement, {
			target: { value: 'test author name' },
		});
		fireEvent.click(addNewAuthorButtonElement);
		expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
	});

	it(`'Add author' button click should add an author to course authors list`, async () => {
		const addToCourseButtonElement = within(
			screen.getByTestId(`${TEST_AUTHOR1.id}`)
		).getByTestId('button');
		fireEvent.click(addToCourseButtonElement);
		await waitFor(() =>
			expect(screen.getByTestId(`${TEST_AUTHOR1.name}`)).toBeInTheDocument()
		);
	});

	it(`'Delete author' button click should delete an author from the course list`, async () => {
		const addToCourseButtonElement = within(
			screen.getByTestId(`${TEST_AUTHOR1.id}`)
		).getByTestId('button');
		fireEvent.click(addToCourseButtonElement);

		const deleteToCourseButtonElement = within(
			screen.getByTestId(`${TEST_AUTHOR1.name}`)
		).getByTestId('button');
		fireEvent.click(deleteToCourseButtonElement);

		const element = document.querySelector(
			`[data-testid="${TEST_AUTHOR1.name}"]`
		);
		return expect(element).toBe(null);
	});
});
