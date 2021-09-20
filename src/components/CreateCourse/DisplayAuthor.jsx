import React from 'react';
import Button from '../Button/Button';

const DisplayAuthor = ({ authorName, id, buttonText }) => {
	return (
		<div className='row p-1' id={id}>
			<div className='col text-end'>
				<span>{authorName} </span>
			</div>
			<div className='col'>
				<Button buttonText={buttonText} />
			</div>
		</div>
	);
};

export default DisplayAuthor;
