import React, { useRef, useContext } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { AppContext } from '../Context/AppContext';

const noop = () => {};

const isCardMatch = (card, filterText) =>
	card.toUpperCase().indexOf(filterText) >= 0;

const isMatch = (cardByTitle, cardById, filterText) =>
	isCardMatch(cardByTitle, filterText) || isCardMatch(cardById, filterText);

const Search = () => {
	//propok card
	const context = useContext(AppContext);

	const searchInputRef = useRef(null);

	const searchCourseHandler = () => {
		const input = searchInputRef.current,
			filterText = input.value.toUpperCase();
		let matchdCards = [];

		context.allCards.forEach((card) => {
			const match = isMatch(card.title, card.id, filterText);
			if (match) {
				matchdCards.push(card);
			}
		});
		context.setCards(matchdCards);
	};
	const searchChangeHandler = ({ target: { value } }) =>
		!value ? context.setCards(context.allCards) : noop();

	return (
		<div className='row align-items-center'>
			<div className='col'>
				<Input
					ref={searchInputRef}
					inputId='searchInput'
					placeholderText='Enter course name or id...'
					changeHandler={searchChangeHandler}
				/>
			</div>
			<div className='col'>
				<Button buttonText='Search' handleClick={searchCourseHandler} />
			</div>
		</div>
	);
};

export default Search;
