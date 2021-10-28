import React from 'react';
import { Provider } from 'react-redux';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { displayDate, pipeDuration } from 'helpers';

import { Courses } from 'components';
import { mockedStore } from 'utils/forTesting';
import { BrowserRouter, Route } from 'react-router-dom';

const testRendering = (mockedStore) => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Route component={Courses} />
			</BrowserRouter>
		</Provider>
	);
};

describe('CourseCard', () => {
	beforeEach(() => {
		testRendering(mockedStore);
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
		const authorsElement = screen.getByTestId('authors');
		expect(authorsElement).toBeInTheDocument();
	});

	it('should display created date in the correct format', () => {
		const creationDateElement = screen.getByTestId('created');
		expect(creationDateElement).toBeInTheDocument();
		expect(displayDate('10/10/2010')).toBe('10.10.2010');
	});
});
