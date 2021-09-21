import React, { useState } from 'react';
import CourseCard from '../CourseCard/CourseCard';
import Button from '../Button/Button';
import Search from '../Search/Search';

const Courses = ({ goToCreateCourse, cards }) => {
	const [searchCards, setSearchCards] = useState(cards);
	const handleClick = () => {
		goToCreateCourse(false);
	};
	/*cards, setcards a searchnek  
	const value = useMemo(
		() => ({ cards, setCards, allCards }),
		[cards, allCards]
	);*/
	return (
		<div className='border border-primary border-2 rounded-1 p-4 my-3'>
			<div className=' py-2'>
				<div className='row align-items-center'>
					<div className='col-sm-8'>
						<Search cards={cards} search={setSearchCards} />
					</div>
					<div className='col-sm-4'>
						<Button buttonText='Add new course' handleClick={handleClick} />
					</div>
				</div>
			</div>
			<div className='row align-items-center'>
				{cards.map((course) => {
					return <CourseCard key={course.id} {...course} />;
				})}
			</div>
		</div>
	);
};

export default Courses;
