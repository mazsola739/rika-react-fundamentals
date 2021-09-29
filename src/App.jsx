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
	const [showCourses, setShowCourses] = useState(true);
	const [getCoursesData, setGetCoursesData] = useState([]);
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
	useEffect(() => {
		getCourses();
	}, []);
	const [getAuthorsData, setGetAuthorsData] = useState([]);
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
		getAuthors();
	}, []);
	//console.log(getAuthorsData, getCoursesData);

	return (
		<Router>
			<div className='App container py-4'>
				<div>
					<Header />
				</div>
				<Switch>
					<Route path='/login'>
						<div>
							<Login />
						</div>
					</Route>
					<Route path='/courses'>
						<div>
							{showCourses && (
								<div>
									<Courses
										goToCreateCourse={setShowCourses}
										cards={getCoursesData}
										authorNames={getAuthorsData}
									/>
								</div>
							)}
							{!showCourses && (
								<div>
									<CreateCourse
										backToCourse={setShowCourses}
										key={''}
										setCards={undefined}
										authorNames={getAuthorsData}
									/>
								</div>
							)}
						</div>
					</Route>
					<Route path='/registration'>
						<div>
							<Registration />
						</div>
					</Route>
					<Route path='/courses/:courseId'>
						<div>
							<CourseInfo />
						</div>
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
