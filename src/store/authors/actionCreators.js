import { SAVE_AUTHOR, FETCH_AUTHORS } from './actionTypes';

export const saveAuthor = (newAuthor) => ({
	type: SAVE_AUTHOR,
	payload: newAuthor,
});

export const fetchAuthors = (authors) => ({
	type: FETCH_AUTHORS,
	payload: authors,
});
