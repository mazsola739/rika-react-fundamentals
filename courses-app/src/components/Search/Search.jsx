import React from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';

const searchStyle = {
	display: 'flex',
	flexDirection: 'row',
	margin: '20px',
};

const Search = () => {
	const searchCourse = () => {
		let input = document.getElementById('searchInput');
		let filterText = input.value.toUpperCase();
		let allCard = document.querySelectorAll('h1');
		let cardByTitle, cardById;
		for (let i = 0; i < allCard.length; i++) {
			cardByTitle = allCard[i].innerText;
			cardById = allCard[i].id;
			let isMatchingTitle = cardByTitle.toUpperCase().indexOf(filterText);
			let isMatchingId = cardById.toUpperCase().indexOf(filterText);
			if (isMatchingTitle >= 0 || isMatchingId >= 0) {
				allCard[i].parentElement.parentElement.style.display = 'flex';
			} else {
				allCard[i].parentElement.parentElement.style.display = 'none';
			}
		}
	};

	const handleClick = () => searchCourse();
	return (
		<div style={searchStyle}>
			<Input
				{...{
					inputId: 'searchInput',
					placeholderText: 'Enter course name or id...',
				}}
			/>
			<Button {...{ buttonText: 'Search', handleClick }} />
		</div>
	);
};

export default Search;
