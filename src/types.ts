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
	variants?: {
		id: string;
		name: string;
		color: string;
		size: string;
	}[];
};

export type TCategoryList = { category?: string; collection?: never };
export type TCollectionList = { category?: never; collection?: string };
