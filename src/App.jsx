import React, { useState, useEffect } from 'react';
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
import userReducer from './store/user/reducer';
import appStore from './store/index';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Courses from './components/Courses/Courses';
import CourseInfo from 'components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';

/*import axios from 'axios';
const apiService = axios.create({
	baseURL: 'http://localhost:3000',
	headers: { 'Content-type': 'application/json' },
});

const fetchData = async (userData) => {
	const { data: answer } = await apiService.post('/login', userData);
	localStorage.setItem('token', answer.result);
	return answer;
};*/

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(userReducer, composedEnhancer);

/*appStore.subscribe(() => {
	console.log('Store changed:', appStore.getState());
});*/

const App = () => {
	const [getCoursesData, setGetCoursesData] = useState([]);
	const [getAuthorsData, setGetAuthorsData] = useState([]);
	const [user] = useState({});
	const [isLogged, setIsLogged] = useState(false);

	const getCourses = () => {
		fetch('http://localhost:3000/courses/all', {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
			.then((response) => response.json())
			.then((myJson) => {
				setGetCoursesData(myJson.result);
			});
	};
	const getAuthors = () => {
		fetch('http://localhost:3000/authors/all', {
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((myJson) => setGetAuthorsData(myJson.result));
	};

	useEffect(() => {
		getCourses();
		getAuthors();
	}, []);

	return (
		<Router>
			<div className='App container py-4'>
				<Header user={user} isLogged={isLogged} setIsLogged={setIsLogged} />

				<Switch>
					<Route path='/login' exact>
						<Provider store={store}>
							<Login setIsLogged={setIsLogged} />
						</Provider>
					</Route>
					<Route path='/courses/add' exact component={CreateCourse}>
						<CreateCourse
							authorNames={getAuthorsData}
							setAuthors={setGetAuthorsData}
							setCards={setGetCoursesData}
							cards={getCoursesData}
							key={''}
						/>
					</Route>
					<Route path='/courses/:courseId' exact component={CourseInfo}>
						<CourseInfo courses={getCoursesData} authorNames={getAuthorsData} />
					</Route>
					<Route path='/courses' exact component={Courses}>
						<Courses cards={getCoursesData} authorNames={getAuthorsData} />
					</Route>

					<Route path='/registration' exact component={Registration}>
						<Registration />
					</Route>
					<Route path='/'>
						{isLogged ? (
							<Redirect to='/courses' />
						) : (
							<Provider store={store}>
								<Login setIsLogged={setIsLogged} />
							</Provider>
						)}
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
