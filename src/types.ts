export type TProductCover = { src: string; alt: string };

export type TProduct = {
	id: string;
	slug: string;
	name: string;
	price: number;
	description: string;
	category: string;
	reviews: { rating: number }[];
	image?: string;
};
