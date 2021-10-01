import { SAVE_AUTHOR, DELETE_AUTHOR, GET_ALL_AUTHORS } from './actionTypes';

export const saveAuthor = (authors) => ({
	type: SAVE_AUTHOR,
	payload: authors,
});
export const deleteAuthor = (authors) => ({
	type: DELETE_AUTHOR,
	payload: authors,
});
export const getAllAuthors = (authors) => ({
	type: GET_ALL_AUTHORS,
	payload: authors,
});
