import { createService } from 'services/authors';
import { FETCH_AUTHORS, SAVE_AUTHOR } from './actionTypes';

const authorService = createService('/authors');

export const fetchAuthorsThunk = async (dispatch) => {
	await authorService
		.getAll()
		.then((response) => response.data)
		.then((myJson) =>
			dispatch({
				type: FETCH_AUTHORS,
				payload: myJson.result,
			})
		);
};

export const saveAuthorsThunk = (newAuthor) => async (dispatch) => {
	const {
		data: { result },
	} = await authorService.save(newAuthor);
	dispatch({
		type: SAVE_AUTHOR,
		payload: result,
	});
};
