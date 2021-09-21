import React, { useRef, useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';

const noop = () => {};

const isCardMatch = (card, filterText) =>
	card.toUpperCase().indexOf(filterText) >= 0;

const isMatch = (cardByTitle, cardById, filterText) =>
	isCardMatch(cardByTitle, filterText) || isCardMatch(cardById, filterText);

const Search = ({ cards, search }) => {
	const [showCards, setShowCards] = useState(cards);
	console.log(showCards);
	const searchInputRef = useRef(null);

	const searchCourseHandler = () => {
		const input = searchInputRef.current,
			filterText = input.value.toUpperCase();
		let matchdCards = [];

		cards.forEach((card) => {
			const match = isMatch(card.title, card.id, filterText);
			if (match) {
				matchdCards.push(card);
			}
		});
		setShowCards(matchdCards);
	};
	const searchChangeHandler = ({ target: { value } }) =>
		!value ? showCards : noop();

	return (
		<div className='row align-items-center'>
			<div className='col'>
				<Input
					ref={searchInputRef}
					inputId='searchInput'
					placeholderText='Enter course name or id...'
					changeHandler={searchChangeHandler}
				/>
				)
			</div>
			<div className='col'>
				<Button buttonText='Search' handleClick={searchCourseHandler} />
			</div>
		</div>
	);
};

export default Search;
