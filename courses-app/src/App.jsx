import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';

const App = () => {
	return (
		<div className='App'>
			<Header></Header>
			<Courses></Courses>
			<CreateCourse></CreateCourse>
		</div>
	);
};

export default App;
