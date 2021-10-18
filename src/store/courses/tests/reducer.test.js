import coursesReducer from '../reducer';
import '@testing-library/jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import { any } from 'prop-types';
import { ADD_COURSE, GET_COURSES } from '../actionTypes';

afterEach(() => {
	cleanup();
});

describe('Reducer', () => {
	const coursesInitialState = [];
	it('should return the initial state', () => {
		const reducer = coursesReducer(undefined, { type: any, payload: any });
		expect(reducer).toEqual(coursesInitialState);
	});

	it('should handle ADD_COURSE', () => {
		const course = {
			id: 'courseId',
			title: 'courseTitle',
			creationDate: 'courseCreationDate',
			description: 'courseDescription',
			authors: ['authorId1', 'authorId2'],
			duration: 1,
		};
		const reducer = coursesReducer(coursesInitialState, {
			type: ADD_COURSE,
			payload: course,
		});
		expect(reducer).toEqual([
			{
				id: 'courseId',
				title: 'courseTitle',
				creationDate: 'courseCreationDate',
				description: 'courseDescription',
				authors: ['authorId1', 'authorId2'],
				duration: 1,
			},
		]);
	});

	it('should handle GET_COURSES', () => {
		const reducer = coursesReducer(coursesInitialState, {
			type: GET_COURSES,
			payload: {
				id: 'courseId',
				title: 'courseTitle',
				creationDate: 'courseCreationDate',
				description: 'courseDescription',
				authors: ['authorId1', 'authorId2'],
				duration: 1,
			},
		});
		expect(reducer).toEqual({
			id: 'courseId',
			title: 'courseTitle',
			creationDate: 'courseCreationDate',
			description: 'courseDescription',
			authors: ['authorId1', 'authorId2'],
			duration: 1,
		});
	});
});
