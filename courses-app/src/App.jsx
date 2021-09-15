import React from 'react';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import './App.css';

function App() {
	return (
		<div className='App'>
			<Header></Header>
			<Courses></Courses>
			<div className='Content'>
				<p className='Search'>search button test</p>
				<p className='Courses'>courses</p>
			</div>
		</div>
	);
}

export default App;
