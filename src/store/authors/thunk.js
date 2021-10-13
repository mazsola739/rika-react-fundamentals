import { createService } from 'services/authors';
import { fetchAuthors, saveAuthor } from './actionCreators';

const authorService = createService('/authors');

export const fetchAuthorsThunk = async (dispatch) => {
	await authorService
		.getAll()
		.then((response) => response.data)
		.then((myJson) => dispatch(fetchAuthors(myJson.result)));
};

export const saveAuthorsThunk = async (newAuthor, dispatch) => {
	await authorService.save(newAuthor);
	await dispatch(saveAuthor(newAuthor));
};
