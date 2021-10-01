import { SAVE_AUTHOR, DELETE_AUTHOR, GET_AUTHOR } from './actionTypes';

export const saveAuthor = (authorData) => ({
	type: SAVE_AUTHOR,
	authorData,
});
export const deleteAuthor = (authorData) => ({
	type: DELETE_AUTHOR,
	authorData,
});
export const getAuthor = (authorData) => ({
	type: GET_AUTHOR,
	authorData,
});
