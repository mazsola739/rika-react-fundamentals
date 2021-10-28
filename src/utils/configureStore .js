import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../store/index';

export const composedEnhancer = composeWithDevTools(
	applyMiddleware(thunkMiddleware)
);

const configureStore = () => {
	const store = createStore(rootReducer, {}, composedEnhancer);

	return store;
};

export default configureStore;
