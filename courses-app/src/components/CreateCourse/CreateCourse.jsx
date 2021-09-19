import React from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Author from '../Author/Author';
import { mockedAuthorsList } from '../../CoursesInfo/AuthorsList';

const textareaStyle = {
	height: '100px',
};

const CreateCourse = () => (
	<div className='border border-primary border-2 rounded-1 p-3 my-3'>
		<div className='row'>
			<div className='col'>
				<p>Title</p>
				<Input placeholderText='Enter title...' />
			</div>
			<div className='col'>
				<Button buttonText='Create course' />
			</div>
		</div>
		<div className='row p-2 my-3'>
			<p>Description</p>
			<textarea
				style={textareaStyle}
				className='border border-secondary border-2 form-control'
				placeholder='Enter description'
			></textarea>
		</div>
		<div className='border border-dark border-2 rounded-1 p-2'>
			<div className='row'>
				<div className='col'>
					<h5 className='text-center'>Add Authors</h5>
					<div>
						<p>Author name</p>
						<Input placeholderText='Enter author name...' />
					</div>
					<div className='col p-2 text-center'>
						<Button buttonText='Create author' />
					</div>
				</div>
				<div className='col'>
					<h5 className='text-center'>Authors</h5>
					<div>
						{mockedAuthorsList.map((author) => {
							return (
								<Author
									key={author.id}
									{...{
										authorName: author.name,
										id: author.id,
										buttonText: 'Add author',
									}}
								/>
							);
						})}
					</div>
				</div>
			</div>
			<div className='row'>
				<div className='col'>
					<h5 className='text-center'>Duration</h5>
					<p>Duration</p>
					<Input placeholderText='Enter duration in minutes...' />
					<p>
						Duration <b>00:00</b> hours
					</p>
				</div>
				<div className='col'>
					<h5 className='text-center'>Course authors</h5>
					<div className='text-center'>
						<span>Author list is empty</span>
					</div>
					{mockedAuthorsList.map((author) => {
						return (
							<Author
								key={author.id}
								{...{
									authorName: author.name,
									id: author.id,
									buttonText: 'Delete author',
								}}
							/>
						);
					})}
				</div>
			</div>
		</div>
	</div>
);

export default CreateCourse;
