import { fetchAuthorsThunk, saveAuthorsThunk } from './thunk';

export const saveAuthor = (newAuthor) => saveAuthorsThunk(newAuthor);
export const fetchAuthors = (authors) => fetchAuthorsThunk(authors);
