export const getRandomNumber = (max: number, min: number) => {
	return Math.random() * (max - min) + min;
};

export const DEFAULT_TAKE = 4;
