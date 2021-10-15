export const pipeDuration = (duration) => {
	const hours = Math.floor(duration / 60);
	const minutes = duration % 60;
	const displayDuration = `${hours < 10 ? '0' + hours : hours}:${
		minutes < 10 ? '0' + minutes : minutes
	} hours`;
	return displayDuration;
};
