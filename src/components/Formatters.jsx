export const formatDuration = (duration) => {
	const hours = Math.floor(duration / 60);
	const minutes = duration % 60;
	const displayDuration = `${hours < 10 ? '0' + hours : hours}:${
		minutes < 10 ? '0' + minutes : minutes
	} hours`;
	return displayDuration;
};

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

export const displayDate = (date) => date.replaceAll('/', '.');
