import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRouter/PrivateRouter';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { fetchAuthorsThunk } from 'store/authors/thunk';
import { fetchCoursesThunk } from 'store/courses/thunk';
import './App.css';
import CourseInfo from 'components/CourseInfo/CourseInfo';
import Courses from './components/Courses/Courses';
import CourseForm from './components/CourseForm/CourseForm';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import rootReducer from './store/index';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(rootReducer, composedEnhancer);

const App = () => {
	const dispatch = store.dispatch;

	const isAuthenticated = localStorage.getItem('token') === null;

	fetchCoursesThunk(dispatch);
	fetchAuthorsThunk(dispatch);

	return (
		<Provider store={store}>
			<div className='App container py-4'>
				<BrowserRouter>
					<Switch>
						<Route path='/login' exact component={Login}>
							<Header />
							<Login />
						</Route>
						<Route path='/registration' exact component={Registration}>
							<Header />
							<Registration />
						</Route>
						<PrivateRoute
							path='/courses'
							exact
							component={Courses}
							isAuthenticated={isAuthenticated}
						>
							<Header />
							<Courses />
						</PrivateRoute>
						<PrivateRoute
							path='/courses/add'
							exact
							component={CourseForm}
							isAuthenticated={isAuthenticated}
						>
							<Header />
							<CourseForm key={''} />
						</PrivateRoute>
						<PrivateRoute
							path='/courses/update/:courseId'
							exact
							component={CourseForm}
							isAuthenticated={isAuthenticated}
						>
							<Header />
							<CourseForm key={''} />
						</PrivateRoute>
						<PrivateRoute
							path='/courses/:courseId'
							exact
							component={CourseInfo}
							isAuthenticated={isAuthenticated}
						>
							<Header />
							<CourseInfo />
						</PrivateRoute>
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
