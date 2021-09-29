import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CourseCard from '../CourseCard/CourseCard';
import Button from '../Button/Button';
import Search from '../Search/Search';

const Courses = ({ goToCreateCourse, cards, authorNames }) => {
	const [searchCards, setSearchCards] = useState([]);
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
							buttonClickHandler={handleClick}
						/>
					</div>
				</div>
			</div>
			<div className='row align-items-center'>
				{cards.map((course) => {
					return (
						<CourseCard key={course.id} {...course} authorNames={authorNames} />
					);
				})}
			</div>
		</div>
	);
};

Courses.propTypes = {
	goToCreateCourse: PropTypes.any,
	cards: PropTypes.any,
};

export default Courses;
