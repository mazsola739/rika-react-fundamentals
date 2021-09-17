import React from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Information from '../Information/Information';

const textAreaStyle = {
	border: 'gold solid 2px',
	minWidth: '97%',
	minHeight: '100px',
};
const tittleTopStyle = {
	margin: ' 20px',
	display: 'flex',
	flexDirection: 'column',
	textAlign: 'left',
};
const titleStyle = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
};
const descriptionStyle = {
	margin: ' 20px',
	display: 'flex',
	flexDirection: 'column',
	textAlign: 'left',
};

const CreateCourse = () => (
	<div>
		<div style={tittleTopStyle}>
			<h3>Title</h3>
			<div style={titleStyle}>
				<div>
					<Input placeholderText='Enter title...' />
				</div>
				<div>
					<Button buttonText='Create course' />
				</div>
			</div>
		</div>
		<div style={descriptionStyle}>
			<h3>Description</h3>
			<textarea
				style={textAreaStyle}
				placeholder='Enter description'
			></textarea>
		</div>
		<Information />
	</div>
);

export default CreateCourse;
