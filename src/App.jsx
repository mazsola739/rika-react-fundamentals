import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { mockedCoursesList } from './CoursesInfo/CoursesList';
import { mockedAuthorsList } from './CoursesInfo/AuthorsList';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';

const App = () => {
	const [showCourses, setShowCourses] = useState(true);
	const [cards, setCards] = useState(mockedCoursesList);
	const [authors, setAuthors] = useState(mockedAuthorsList);

	/* goToCreateCourse={() => { setShowCourses(false)}} courses */
	/* backToCourse={() => { setShowCourses(true)}} addCourse={(newCourse)=> {
	setCourses((currentCourse) => { currentCourse.push(newCourse)})
	}} */

	return (
		<div className='App container py-4'>
			<div>
				<Header />
			</div>
			<div>
				{showCourses && (
					<div id='courses'>
						<Courses goToCreateCourse={setShowCourses} cards={cards} />
					</div>
				)}
				{!showCourses && (
					<div id='createCourses'>
						<CreateCourse
							key={uuidv4()}
							backToCourse={setShowCourses}
							setCards={setCards}
							cards={cards}
							authors={authors}
							setAuthors={setAuthors}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default App;
