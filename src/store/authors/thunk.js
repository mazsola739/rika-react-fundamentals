import { createService } from 'services/authors';
import { GET_AUTHORS, ADD_AUTHOR } from './actionTypes';

const authorService = createService('/authors');

export const getAuthorsThunk = () => async (dispatch) => {
	const authors = await authorService
		.getAll()
		.then((response) => response.data)
		.then(({ result }) => result);

	dispatch({
		type: GET_AUTHORS,
		payload: authors,
	});
};

export const addAuthorsThunk = (newAuthor) => async (dispatch) => {
	const {
		data: { result },
	} = await authorService.add(newAuthor);
	dispatch({
		type: ADD_AUTHOR,
		payload: result,
	});
};
