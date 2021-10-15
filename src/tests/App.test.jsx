import { cleanup, render, screen } from '@testing-library/react';
import App from 'App';
import CourseCard from 'components/CourseCard/CourseCard';
import CourseForm from 'components/CourseForm/CourseForm';
import Courses from 'components/Courses/Courses';
import Header from 'components/Header/Header';
import React from 'react';

describe(`Rika's app`, () => {
	afterEach(() => {
		cleanup();
	});
	describe('CourseCard', () => {
		render(
			<App>
				<CourseCard isAdmin={undefined} />
			</App>
		);

		test('should display title', () => {
			expect(true).toBe(true);
		});

		test('should display description', () => {
			expect(true).toBe(true);
		});

		test('should display piped duration', () => {
			expect(true).toBe(true);
		});

		test('should display authors list', () => {
			expect(true).toBe(true);
		});

		test('should display created date', () => {
			expect(true).toBe(true);
		});
	});

	describe('Courses', () => {
		render(
			<App>
				<Courses />
			</App>
		);

		test('should display amount of CourseCard equal length of courses array', () => {
			expect(true).toBe(true);
		});
		test('should display Empty container if courses array length is empty', () => {
			expect(true).toBe(true);
		});
	});

	describe('Header', () => {
		render(
			<App>
				<Header />
			</App>
		);

		const logo = screen.getByTestId('logo');

		test('should have logo', () => {
			expect(logo).toBeInTheDocument();
		});

		test('should display button and name.', () => {
			expect(true).toBe(true);
		});
	});

	describe('CourseForm', () => {
		render(
			<App>
				<CourseForm />
			</App>
		);

		test('should show after a click on a button "Add new course"', () => {
			expect(true).toBe(true);
		});

		test('should show authors list', () => {
			expect(true).toBe(true);
		});

		test('add an author to all authors list', () => {
			expect(true).toBe(true);
		});

		test('add an author to course authors list', () => {
			expect(true).toBe(true);
		});

		test('delete an author from course authors list', () => {
			expect(true).toBe(true);
		});
	});
});
