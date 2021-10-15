export const showAuthor = (authors, names) => {
	const authorList = authors
		.map((authorId) => {
			let foundAuthor = authorId;
			names.map(
				(author) =>
					(foundAuthor = author.id === authorId ? author.name : foundAuthor)
			);
			return foundAuthor;
		})
		.join()
		.replaceAll(',', ', ');
	return authorList;
};
