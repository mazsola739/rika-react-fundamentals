import { getApiService } from 'services/apiService';
import { saveNewAuthor } from 'services/authors';
import { fetchAuthors, saveAuthor } from './actionCreators';

export const fetchAuthorsThunk = (dispatch) => {
	getApiService()
		.get(`/authors/all`)
		.then((response) => response.data)
		.then((myJson) => dispatch(fetchAuthors(myJson.result)));
};

export const saveAuthorsThunk = (newAuthor, dispatch) => {
	saveNewAuthor(newAuthor);
	dispatch(saveAuthor(newAuthor));
};
