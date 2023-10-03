import {
	ProductsGetAllDocument,
	ProductsGetByCategoryDocument,
	ProductsGetByCollectionDocument,
	ProductsGetByIdDocument,
	type ProductItemFragment,
} from "@/gql/graphql";
import { executeGraphql } from "@/lib/graphql";
import { type TProduct } from "@/types";

const TAKE_DEFAULT = 4;

export const getProductsByCategory = async (params?: {
	slug: string;
	page?: number;
	take?: number;
}) => {
	const { page = 0, take = TAKE_DEFAULT, slug } = params ?? {};
	if (!slug) return {};

	const res = await executeGraphql(ProductsGetByCategoryDocument, {
		slug,
		first: take,
		skip: page * take,
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
}) => {
	const { page = 0, take = TAKE_DEFAULT, slug } = params ?? {};
	if (!slug) return {};

	const res = await executeGraphql(ProductsGetByCollectionDocument, {
		slug,
		first: take,
		skip: page * take,
	});
	const total = res.productsConnection.aggregate.count;
	const results = res.products || [];
	const products = results.map((p) => fromApiToProduct(p));
	return { products, total };
};

export const getProductById = async (id: TProduct["id"]) => {
	const res = await executeGraphql(ProductsGetByIdDocument, {
		id,
	});

	const p = res.product;
	if (!p) return undefined;

	return fromApiToProduct(p);
};

export const getProducts = async (params?: { page?: number; take?: number }) => {
	const { page = 0, take = TAKE_DEFAULT } = params ?? {};

	const res = await executeGraphql(ProductsGetAllDocument, {
		first: take,
		skip: page * take,
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
		reviews: p.reviews,
		image: p.images[0]?.url,
		variants: p.variants,
	}) as TProduct;
