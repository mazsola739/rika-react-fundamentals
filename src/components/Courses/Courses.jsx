import React, { useState } from 'react';
import CourseCard from '../CourseCard/CourseCard';
import Button from '../Button/Button';
import Search from '../Search/Search';

const Courses = ({ goToCreateCourse, cards }) => {
	const [searchCards, setSearchCards] = useState(cards);
	const handleClick = () => goToCreateCourse(false);

	return (
		<div className='border border-primary border-2 rounded-1 p-4 my-3'>
			<div className=' py-2'>
				<div className='row align-items-center'>
					<div className='col-sm-8'>
						<Search
							cards={cards}
							searchCards={searchCards}
							setSearchCards={setSearchCards}
						/>
					</div>
					<div className='col-sm-4'>
						<Button
							buttonText='Add new course'
							handleClick={handleClick}
							id='add'
						/>
					</div>
				</div>
			</div>
			<div className='row align-items-center'>
				{searchCards.map((course) => (
					<CourseCard key={course.id} {...course} />
				))}
			</div>
		</div>
	);
};

export default Courses;
