import {
	ProductsGetAllDocument,
	ProductsGetByCategoryDocument,
	ProductsGetByCollectionDocument,
	ProductsGetByIdDocument,
	ProductsGetSearchDocument,
	type ProductItemFragment,
	type ProductOrderByInput,
} from "@/gql/graphql";
import { executeGraphql } from "@/lib/graphql";
import { type TProduct } from "@/types";

const TAKE_DEFAULT = 4;

export const getProductsByCategory = async (params?: {
	slug: string;
	page?: number;
	take?: number;
	orderBy?: ProductOrderByInput;
}) => {
	const { page = 0, take = TAKE_DEFAULT, slug, orderBy } = params ?? {};
	if (!slug) return {};

	const res = await executeGraphql({
		query: ProductsGetByCategoryDocument,
		variables: {
			slug,
			first: take,
			skip: page * take,
			orderBy,
		},
		next: {
			revalidate: 60 * 60 * 24,
		},
	});
	const total = res.productsConnection.aggregate.count;
	const results = res.products || [];
	const products = results.map((p) => fromApiToProduct(p));
	return { products, total };
};

export const getProductsByCollection = async (params?: {
	slug: string;
	page?: number;
	take?: number;
	orderBy?: ProductOrderByInput;
}) => {
	const { page = 0, take = TAKE_DEFAULT, slug, orderBy } = params ?? {};
	if (!slug) return {};

	const res = await executeGraphql({
		query: ProductsGetByCollectionDocument,
		variables: {
			slug,
			first: take,
			skip: page * take,
			orderBy,
		},
		next: {
			revalidate: 60 * 60 * 24,
			tags: ["products", "collection"],
		},
	});
	const total = res.productsConnection.aggregate.count;
	const results = res.products || [];
	const products = results.map((p) => fromApiToProduct(p));
	return { products, total };
};

export const getProductById = async (id: TProduct["id"]) => {
	const res = await executeGraphql({
		query: ProductsGetByIdDocument,
		variables: {
			id,
		},
		next: {
			revalidate: 30,
		},
	});

	const p = res.product;

	if (!p) return undefined;

	return fromApiToProduct(p);
};

export const getProducts = async (params?: {
	page?: number;
	take?: number;
	orderBy?: ProductOrderByInput;
}) => {
	const { page = 0, take = TAKE_DEFAULT, orderBy } = params ?? {};

	const res = await executeGraphql({
		query: ProductsGetAllDocument,
		variables: {
			first: take,
			skip: page * take,
			orderBy,
		},
		next: {
			tags: ["products"],
		},
	});
	const total = res.productsConnection.aggregate.count;
	const results = res.products || [];
	const products = results.map((p) => fromApiToProduct(p));
	return { products, total };
};

export const getProductsSearch = async (params?: {
	page?: number;
	take?: number;
	search: string;
}) => {
	const { page = 0, take = TAKE_DEFAULT } = params ?? {};

	const res = await executeGraphql({
		query: ProductsGetSearchDocument,
		variables: {
			first: take,
			skip: page * take,
			search: params!.search,
		},
		next: {
			tags: ["products"],
		},
	});
	const total = res.productsConnection.aggregate.count;
	const results = res.products || [];
	const products = results.map((p) => fromApiToProduct(p));
	return { products, total };
};

const fromApiToProduct = (p: ProductItemFragment) =>
	({
		id: p.id,
		slug: p.slug,
		name: p.name,
		price: p.price,
		description: p.description,
		category: p.categories[0]?.name,
		collection: p.collections[0]?.name,
		reviews: p.reviews,
		averageRating: p.averageRating,
		image: p.images[0]?.url,
		variants: p.variants,
	}) as TProduct;
