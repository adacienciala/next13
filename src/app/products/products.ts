import { getRandomNumber } from "@/app/products/utils";
import { type TProduct } from "@/types";

export const products: TProduct[] = [
	{
		name: "Product 1",
		category: "Category 1",
		price: getRandomNumber(100, 10),
		image: {
			src: `https://picsum.photos/300?random=${Math.random()}`,
			alt: "Product 1 image",
		},
	},
	{
		name: "Product 2",
		category: "Category 2",
		price: getRandomNumber(100, 10),
		image: {
			src: `https://picsum.photos/300?random=${Math.random()}`,
			alt: "Product 2 image",
		},
	},
	{
		name: "Product 3",
		category: "Category 3",
		price: getRandomNumber(100, 10),
		image: {
			src: `https://picsum.photos/300?random=${Math.random()}`,
			alt: "Product 3 image",
		},
	},
	{
		name: "Product 4",
		category: "Category 4",
		price: getRandomNumber(100, 10),
		image: {
			src: `https://picsum.photos/300?random=${Math.random()}`,
			alt: "Product 4 image",
		},
	},
];
