import React from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';

const Search = () => {
	const searchCourse = () => {
		let input = document.getElementById('searchInput');
		let filterText = input.value.toUpperCase();
		let allCard = document.querySelectorAll('h3');
		let cardByTitle, cardById;
		for (let i = 0; i < allCard.length; i++) {
			cardByTitle = allCard[i].innerText;
			cardById = allCard[i].id;
			let isMatchingTitle = cardByTitle.toUpperCase().indexOf(filterText);
			let isMatchingId = cardById.toUpperCase().indexOf(filterText);
			if (isMatchingTitle >= 0 || isMatchingId >= 0) {
				allCard[i].parentElement.parentElement.parentElement.style.display = '';
			} else {
				allCard[i].parentElement.parentElement.parentElement.style.display =
					'none';
			}
		}
	};

	const handleClick = () => searchCourse();

	return (
		<div className='row align-items-center'>
			<div className='col'>
				<Input
					{...{
						inputId: 'searchInput',
						placeholderText: 'Enter course name or id...',
					}}
				/>
			</div>{' '}
			<div className='col'>
				<Button {...{ buttonText: 'Search', handleClick }} />
			</div>
		</div>
	);
};

export default Search;
