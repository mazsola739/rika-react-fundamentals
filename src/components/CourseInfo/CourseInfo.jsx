import React from 'react';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

const CourseInfo = ({
	title,
	description,
	id,
	displayDuration,
	authorList,
}) => {
	return (
		<div className='border border-primary border-2 rounded-1 p-4 my-3'>
			<Link to='/courses'>
				<Button
					buttonText='&lt; Back to courses'
					handleClick={undefined}
					id={undefined}
				/>
			</Link>
			<h2 className='text-center'>{title}</h2>
			<div className='row'>
				<div className='col-sm-8'>{description}</div>
				<div className='col-sm-4'>
					<p>ID: {id}</p>
					<p>Duration: {displayDuration}</p>
					<p>Created: </p>
					<p>Authors: {authorList}</p>
				</div>
			</div>
		</div>
	);
};

export default CourseInfo;
