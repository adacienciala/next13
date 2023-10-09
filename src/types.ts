import { type ReviewItemFragment } from "@/gql/graphql";

export type TProductCover = { src: string; alt: string };

export type TProduct = {
	id: string;
	slug: string;
	name: string;
	price: number;
	description: string;
	category: string;
	collection: string;
	reviews: ReviewItemFragment[];
	image?: string;
	averageRating?: number;
	variants?: {
		id: string;
		name: string;
		color: string;
		size: string;
	}[];
};

export type TCategoryList = { category?: string; collection?: never };
export type TCollectionList = { category?: never; collection?: string };
