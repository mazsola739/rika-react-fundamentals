import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRouter/PrivateRouter';
import PropTypes from 'prop-types';
import './App.css';
import CourseInfo from 'components/CourseInfo/CourseInfo';
import Courses from './components/Courses/Courses';
import CourseForm from './components/CourseForm/CourseForm';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import { getAuthors } from 'store/authors/actionCreators';
import { getCourses } from 'store/courses/actionCreators';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './store/index';
import { Provider } from 'react-redux';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(rootReducer, composedEnhancer);

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
