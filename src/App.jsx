import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { mockedCoursesList } from './CoursesInfo/CoursesList';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import { AppProvider } from './components/Context/AppContext';

const App = () => {
	const [showCourses, setShowCourses] = useState(true);
	const [cards, setCards] = useState(mockedCoursesList);
	// mockedCourseList -> (courses, setCourses)
	/* goToCreateCourse={() => { setShowCourses(false)}} courses */
	/* backToCourse={() => { setShowCourses(true)}} addCourse={(newCourse)=> {
	setCourses((currentCourse) => { currentCourse.push(newCourse)})
	}} */
	/*<div>
		<button onClick={() => setShowCourses('Nem cica')}>Hehe</button>
		{showCourses && <div>{showCourses}</div>}
	</div>*/

	return (
		<AppProvider>
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
								backToCourse={setShowCourses}
								setCards={setCards}
								cards={cards}
							/>
						</div>
					)}
				</div>
			</div>
		</AppProvider>
	);
};

export default App;
