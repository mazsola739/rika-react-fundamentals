import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';

const App = () => {
	return (
		<div className='App container py-4'>
			<div>
				<Header />
			</div>
			<div id='courses'>
				<Courses />
			</div>
			<div id='createCourse'>
				<CreateCourse />
			</div>
		</div>
	);
};

export default App;
