import React from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Author from '../Author/Author';

const informationsStyle = {
	border: 'black solid 2px',
	display: 'flex',
	flexDirection: 'row',
	margin: '20px',
};
const leftStyle = {
	margin: ' 20px',
	widht: '50%',
};
const rightStyle = {
	margin: ' 20px',
	widht: '50%',
};

const Information = () => (
	<div style={informationsStyle}>
		<div style={leftStyle}>
			<div>
				<h3>Add Authors</h3>
				<div>
					<p>Author name</p>
					<Input placeholderText='Enter author name...' />
					<Button buttonText='Create author' />
				</div>
			</div>
			<div>
				<h3>Duration</h3>
				<p>Duration</p>
				<Input placeholderText='Enter duration in minutes...' />
				<p>
					Duration <b>00:00</b> hours
				</p>
			</div>
		</div>
		<div style={rightStyle}>
			<div>
				<h3>Authors</h3>
				<Author />
			</div>
			<div>
				<h3>Course authors</h3>
				<p>Author list is empty</p>
			</div>
		</div>
	</div>
);

export default Information;
