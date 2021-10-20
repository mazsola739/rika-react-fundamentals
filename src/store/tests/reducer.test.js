import coursesReducer from '../courses/reducer';
import '@testing-library/jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import { any } from 'prop-types';
import { ADD_COURSE, GET_COURSES } from '../courses/actionTypes';

afterEach(() => {
	cleanup();
});

describe('Reducer', () => {
	const coursesInitialState = [];
	const TEST_COURSE = {
		id: 'courseId',
		title: 'courseTitle',
		creationDate: 'courseCreationDate',
		description: 'courseDescription',
		authors: ['authorId1', 'authorId2'],
		duration: 1,
	};

	it('should return the initial state', () => {
		const reducer = coursesReducer(undefined, { type: any, payload: any });
		expect(reducer).toEqual(coursesInitialState);
	});

	it('should handle ADD_COURSE', () => {
		const reducer = coursesReducer(coursesInitialState, {
			type: ADD_COURSE,
			payload: TEST_COURSE,
		});
		expect(reducer).toEqual([TEST_COURSE]);
	});

	it('should handle GET_COURSES', () => {
		const reducer = coursesReducer(coursesInitialState, {
			type: GET_COURSES,
			payload: [TEST_COURSE],
		});
		expect(reducer).toEqual([TEST_COURSE]);
	});
});
