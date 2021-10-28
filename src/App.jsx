import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import './App.css';
import {
	CourseForm,
	CourseInfo,
	Courses,
	Header,
	Login,
	Registration,
} from 'components';

import { getAuthors } from 'store/authors/actionCreators';
import { getCourses } from 'store/courses/actionCreators';
import configureStore from 'utils/configureStore ';
import PrivateRoute from 'components/routes/PrivateRoute';

const App = () => {
	const store = configureStore();
	const dispatch = store.dispatch;
	const isAdmin = () => store.getState().user.role === 'admin';

	useEffect(() => {
		// @ts-ignore
		dispatch(getCourses());
		// @ts-ignore
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
						<Route path='/courses' exact component={Courses} />
						<PrivateRoute
							path='/courses/add'
							exact
							component={CourseForm}
							isAdmin={isAdmin}
						/>
						<PrivateRoute
							path='/courses/update/:courseId'
							exact
							component={CourseForm}
							isAdmin={isAdmin}
						/>
						<Route path='/courses/:courseId' exact component={CourseInfo} />
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
