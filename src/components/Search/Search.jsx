import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import Input from '../Input/Input';
import Button from '../Button/Button';

const isCardMatch = (card, filterText) =>
	card.toUpperCase().indexOf(filterText) >= 0;

const isMatch = (cardByTitle, cardById, filterText) =>
	isCardMatch(cardByTitle, filterText) || isCardMatch(cardById, filterText);

const Search = ({ setSearchCards, searchCards, cards }) => {
	const searchInputRef = useRef(null);

	const searchCourseHandler = () => {
		const input = searchInputRef.current,
			filterText = input.value.toUpperCase();
		let matchedCards = [];

		searchCards.forEach((card) => {
			const match = isMatch(card.title, card.id, filterText);
			if (match) {
				matchedCards.push(card);
			}
		});

		setSearchCards([...matchedCards]);
		matchedCards = [];
	};

	const searchChangeHandler = ({ target: { value } }) =>
		!value && setSearchCards(cards);

	return (
		<div className='row'>
			<div className='col'>
				<Input
					ref={searchInputRef}
					placeholderText='Enter course name or id...'
					changeHandler={searchChangeHandler}
					value={undefined}
					text='Search'
					name={undefined}
				/>
			</div>
			<div className='col'>
				<Button
					text='Search'
					clickHandler={searchCourseHandler}
					icon={undefined}
				/>
			</div>
		</div>
	);
};

Search.propTypes = {
	setSearchCards: PropTypes.any,
	searchCards: PropTypes.any,
	cards: PropTypes.any,
};

export default Search;
