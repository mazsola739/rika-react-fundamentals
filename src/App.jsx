import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import './App.css';

import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Courses from './components/Courses/Courses';
import CourseInfo from 'components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';

const App = () => {
	const [getCoursesData, setGetCoursesData] = useState([]);
	const [getAuthorsData, setGetAuthorsData] = useState([]);
	const [user, setUser] = useState({});
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
				<div>
					<Header user={user} isLogged={isLogged} setIsLogged={setIsLogged} />
				</div>
				<Switch>
					<Route path='/login'>
						<Login login={(userData) => setUser(userData)} />
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

					<Route path='/registration' component={Registration}>
						<Registration />
					</Route>

					<Route path='/' exact>
						<Redirect to='/login' />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
