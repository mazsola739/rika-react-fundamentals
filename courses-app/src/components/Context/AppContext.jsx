import React, { createContext, useState, useMemo } from 'react';
import { mockedCoursesList } from '../../CoursesInfo/CoursesList';

const AppContext = createContext();

const AppProvider = (props) => {
	const [cards, setCards] = useState(mockedCoursesList);
	const [allCards] = useState(mockedCoursesList);

	const value = useMemo(
		() => ({ cards, setCards, allCards }),
		[cards, allCards]
	);

	return (
		<AppContext.Provider value={value}>{props.children}</AppContext.Provider>
	);
};
export { AppContext, AppProvider };
