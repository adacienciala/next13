export type TProductCover = { src: string; alt: string };

export type TProduct = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	rating: TProductRating;
	image: string;
	longDescription: string;
};

export type TProductRating = {
	rate: number;
	count: number;
};
