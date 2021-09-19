import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import { AppProvider } from './components/Context/AppContext';

const App = () => {
	return (
		<AppProvider>
			<div className='App container py-4'>
				<div>
					<Header />
				</div>
				<div id='courses'>
					<Courses />
				</div>
				<div id='createCourses'>
					<CreateCourse />
				</div>
			</div>
		</AppProvider>
	);
};

export default App;
