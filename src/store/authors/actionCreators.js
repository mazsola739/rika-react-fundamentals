import { getAuthorsThunk, addAuthorsThunk } from './thunk';

export const addAuthor = (newAuthor) => addAuthorsThunk(newAuthor);
export const getAuthors = (authors) => getAuthorsThunk();
