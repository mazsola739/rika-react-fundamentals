import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRouter/PrivateRouter';
import PropTypes from 'prop-types';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import './App.css';
import {
	CourseForm,
	CourseInfo,
	Courses,
	Header,
	Login,
	Registration,
} from 'components';

import rootReducer from './store/index';
import { getAuthors } from 'store/authors/actionCreators';
import { getCourses } from 'store/courses/actionCreators';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(rootReducer, {}, composedEnhancer);

export const createStoreForTesting = (initialStore) =>
	createStore(rootReducer, initialStore, composedEnhancer);

const App = () => {
	const dispatch = store.dispatch;

	const isAuthenticated = () => localStorage.getItem('token') !== null;

	useEffect(() => {
		dispatch(getCourses());
		dispatch(getAuthors());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Provider store={store}>
			<div className='App container py-4'>
				<BrowserRouter>
					<Header />
					<Switch>
						<Route path='/login' exact component={Login} />
						<Route path='/registration' exact component={Registration} />
						<PrivateRoute
							path='/courses'
							exact
							component={Courses}
							isAuthenticated={isAuthenticated}
						/>
						<PrivateRoute
							path='/courses/add'
							exact
							component={CourseForm}
							isAuthenticated={isAuthenticated}
						/>
						<PrivateRoute
							path='/courses/update/:courseId'
							exact
							component={CourseForm}
							isAuthenticated={isAuthenticated}
						/>
						<PrivateRoute
							path='/courses/:courseId'
							exact
							component={CourseInfo}
							isAuthenticated={isAuthenticated}
						/>
						<Route path='/'>
							{store.getState().user.isAuth ? (
								<Redirect to='/courses' />
							) : (
								<Redirect to='/login' />
							)}
						</Route>
					</Switch>
				</BrowserRouter>
			</div>
		</Provider>
	);
};

App.propTypes = {
	store: PropTypes.object,
};

export default App;
