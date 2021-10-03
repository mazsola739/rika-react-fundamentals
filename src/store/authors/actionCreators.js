import { SAVE_AUTHOR, DELETE_AUTHOR, FETCH_AUTHORS } from './actionTypes';

export const saveAuthor = ({ newAuthor }) => ({
	type: SAVE_AUTHOR,
	payload: newAuthor,
});
export const deleteAuthor = (author) => ({
	type: DELETE_AUTHOR,
	payload: author,
});
export const fetchAuthors = (authors) => ({
	type: FETCH_AUTHORS,
	payload: authors,
});
