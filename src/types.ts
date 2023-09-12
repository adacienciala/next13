export type TProductCover = { src: string; alt: string };

export type TProduct = {
	name: string;
	category: string;
	price: number;
	image: TProductCover;
};
