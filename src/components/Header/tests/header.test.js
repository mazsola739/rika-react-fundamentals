import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Header } from 'components';
import { mockedStore, TEST_USER } from 'utils/forTesting';

afterEach(() => {
	cleanup();
});

describe('Header', () => {
	beforeEach(() => {
		render(
			<Provider
				// @ts-ignore
				store={mockedStore}
			>
				<BrowserRouter>
					<Header />
				</BrowserRouter>
			</Provider>
		);
	});

	it(`should have logo and user's name`, () => {
		const logoElement = screen.getByTestId('logo');
		const userNameElement = screen.getByTestId('name');
		expect(logoElement).toBeInTheDocument();
		expect(logoElement).toHaveTextContent('Courses');
		expect(userNameElement).toHaveTextContent(TEST_USER.name);
		expect(userNameElement).toBeInTheDocument();
	});
});
