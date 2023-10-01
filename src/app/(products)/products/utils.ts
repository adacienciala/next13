export const getRandomNumber = (max: number, min: number) => {
	return Math.random() * (max - min) + min;
};
