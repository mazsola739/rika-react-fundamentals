/* import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../src/store/index';

export default function configureStore(preloadedState) {
	const composedEnhancer = composeWithDevTools(
		applyMiddleware(thunkMiddleware)
	);

	const store = createStore(rootReducer, preloadedState, composedEnhancer);

	return store;
}
 */
