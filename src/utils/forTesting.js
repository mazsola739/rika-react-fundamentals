import { composedEnhancer } from 'utils/configureStore ';
import { createStore } from 'redux';
import rootReducer from '../store/index';

export const createStoreForTesting = (initialStore) =>
	createStore(rootReducer, initialStore, composedEnhancer);

export const TEST_USER = {
	isAuth: true,
	name: 'Admin',
	email: 'admin@email.com',
	token: 'test-token',
	role: 'admin',
};
export const TEST_COURSE1 = {
	id: 'courseId1',
	title: 'courseTitle',
	creationDate: 'courseCreationDate',
	description: 'courseDescription',
	authors: ['authorId1', 'authorId2'],
	duration: 42,
};
export const TEST_AUTHOR1 = {
	name: 'author1',
	id: 'authorId1',
};
export const TEST_AUTHOR2 = {
	name: 'author2',
	id: 'authorId2',
};

export const mockedState = {
	user: TEST_USER,
	courses: [TEST_COURSE1],
	authors: [TEST_AUTHOR1, TEST_AUTHOR2],
};

export const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

export const isAdmin = () => true;
