import { getApiService } from './apiService';

export const saveNewAuthor = (newAuthor) =>
	getApiService().post('/authors/add', newAuthor);
