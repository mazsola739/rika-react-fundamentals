import React from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Information from '../Information/Information';

const newCourseStyle = {
	border: 'blue solid 2px',
	margin: '20px',
};
const textAreaStyle = {
	border: 'gold solid 2px',
	minWidth: '97%',
	minHeight: '100px',
};

const CreateCourse = () => (
	<div style={newCourseStyle}>
		<div>
			<p>Title</p>
			<Input />
			<Button />
		</div>
		<div>
			<p>Description</p>
			<textarea
				style={textAreaStyle}
				placeholder='Enter lore ipsum...'
			></textarea>
		</div>
		<Information />
	</div>
);

export default CreateCourse;
