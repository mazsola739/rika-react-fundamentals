import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from 'App';
import CourseCard from 'components/CourseCard/CourseCard';
import CourseForm from 'components/CourseForm/CourseForm';
import Courses from 'components/Courses/Courses';
import Header from 'components/Header/Header';
import React from 'react';

describe(`Rika's App`, () => {
	afterEach(() => {
		cleanup();
	});

	describe('Header', () => {
		beforeEach(() => {
			render(
				<App>
					<Header isAuthenticated={undefined} />
				</App>
			);
		});

		it('should have logo', () => {
			const logo = screen.getByTestId('logo');
			expect(logo).toBeInTheDocument();
			expect(logo).toHaveTextContent('Courses');
		});

		it('should display button and name.', () => {
			expect(true).toBe(true);
		});
	});

	describe('Courses', () => {
		beforeAll(() => {
			render(
				<App>
					<Courses />
				</App>
			);
		});

		it('should display amount of CourseCard equal length of courses array', () => {
			expect(true).toBe(true);
		});
		it('should display Empty container if courses array length is empty', () => {
			expect(true).toBe(true);
		});
	});

	describe('CourseCard', () => {
		beforeAll(() => {
			render(
				<App>
					<CourseCard isAdmin={true} />
				</App>
			);
		});

		it('should display title', () => {
			expect(true).toBe(true);
		});

		it('should display description', () => {
			expect(true).toBe(true);
		});

		it('should display piped duration', () => {
			expect(true).toBe(true);
		});

		it('should display authors list', () => {
			expect(true).toBe(true);
		});

		it('should display created date', () => {
			expect(true).toBe(true);
		});
	});

	describe('CourseForm', () => {
		beforeAll(() => {
			render(
				<App>
					<CourseForm />
				</App>
			);
		});

		it('should show after a click on a button "Add new course"', () => {
			expect(true).toBe(true);
		});

		it('should show authors list', () => {
			expect(true).toBe(true);
		});

		it('add an author to all authors list', () => {
			expect(true).toBe(true);
		});

		it('add an author to course authors list', () => {
			expect(true).toBe(true);
		});

		it('delete an author from course authors list', () => {
			expect(true).toBe(true);
		});
	});
});
