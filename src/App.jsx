import React, { useState } from 'react';
import './App.css';
import { mockedCoursesList } from './components/CourseInfo/CoursesList';
import { mockedAuthorsList } from './components/CourseInfo/AuthorsList';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

const App = () => {
	return (
		<Router>
			<div className='App container py-4'>
				<div>
					<Header />
				</div>
				<Switch>
					<Route path='/' exact>
						<Redirect to='/login' />
					</Route>
					<Route path='/courses'>
						<CoursesPage />
					</Route>
					<Route path='/login'>
						<LoginPage />
					</Route>
					<Route path='/registration'>
						<RegistrationPage />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

const CoursesPage = () => {
	const [showCourses, setShowCourses] = useState(true);
	const [cards, setCards] = useState(mockedCoursesList);
	const [authors, setAuthors] = useState(mockedAuthorsList);

	return (
		<div>
			{showCourses && (
				<div id='courses'>
					<Courses goToCreateCourse={setShowCourses} cards={cards} />
				</div>
			)}
			{!showCourses && (
				<div id='createCourses'>
					<CreateCourse
						backToCourse={setShowCourses}
						setCards={setCards}
						cards={cards}
						authors={authors}
						setAuthors={setAuthors}
						key={''}
					/>
				</div>
			)}
		</div>
	);
};

const LoginPage = () => {
	return (
		<div>
			<Login />
		</div>
	);
};

const RegistrationPage = () => {
	return (
		<div>
			<Registration />
		</div>
	);
};

export default App;
