import { createStore } from 'redux';
import userReducer from './user/reducer';
import courseReducer from './courses/reducer';
import authorReducer from './authors/reducer';

const userStore = createStore(userReducer);
const courseStore = createStore(courseReducer);
const authorStore = createStore(authorReducer);

const appStore = {
	user: {
		userStore,
	},
	courses: courseStore,
	authors: authorStore,
};

export default appStore;
