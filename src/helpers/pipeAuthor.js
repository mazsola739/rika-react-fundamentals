const findAuthor = (id, authorList) =>
	authorList.find((author) => author.id === id).name;

const matchedAuthors = (ids, authorList) =>
	ids.map((id) => findAuthor(id, authorList));

const authorsInStringForm = (authorList) => authorList.join(', ');

export const showAuthor = (authorList, ids) =>
	authorsInStringForm(matchedAuthors(authorList, ids));
