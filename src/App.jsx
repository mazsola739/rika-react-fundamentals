import React, { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import './App.css';

import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Courses from './components/Courses/Courses';
import CourseInfo from 'components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';
import rootReducer from './store/index';
import { getAllAuthors } from './store/authors/actionCreators';
import { getAllCourses } from './store/courses/actionCreators';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(rootReducer, composedEnhancer);

const App = () => {
	const dispatch = store.dispatch;

	useEffect(() => {
		const baseUrl = 'http://localhost:3000';
		const headers = {
			'Content-Type': 'application/json',
		};
		const getCourses = () => {
			fetch(`${baseUrl}/courses/all`, {
				headers: headers,
			})
				.then((response) => response.json())
				.then((myJson) => {
					dispatch(getAllCourses(myJson));
				});
		};
		getCourses();
		const getAuthors = () => {
			fetch(`${baseUrl}/authors/all`, {
				headers: headers,
			})
				.then((response) => response.json())
				.then((myJson) => dispatch(getAllAuthors(myJson)));
		};

		getAuthors();
	});

	const user = store.getState().user;
	const courses = store.getState().courses;
	const authors = store.getState().authors;
	console.log(store);
	console.log(user);
	console.log(courses);
	console.log(authors);

	return (
		<Router>
			<Provider store={store}>
				<div className='App container py-4'>
					<Header user={user} />
					<Switch>
						<Route path='/login' exact>
							<Login />
						</Route>
						<Route path='/courses/add' exact component={CreateCourse}>
							<CreateCourse store={store} key={''} />
						</Route>
						<Route path='/courses/:courseId' exact component={CourseInfo}>
							<CourseInfo store={store} />
						</Route>
						<Route path='/courses' exact component={Courses}>
							<Courses store={store} />
						</Route>
						<Route path='/registration' exact component={Registration}>
							<Registration />
						</Route>
						<Route path='/' component={App}>
							{user.isAuth ? (
								<Redirect to='/courses' />
							) : (
								<Redirect to='/Login' />
							)}
						</Route>
					</Switch>
				</div>
			</Provider>
		</Router>
	);
};

export default App;
