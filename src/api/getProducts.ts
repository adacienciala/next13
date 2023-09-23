import { type TProduct } from "@/types";

export const getProducts = async (params?: { page?: number; take?: number }) => {
	const { page = 0, take = 20 } = params ?? {};
	const offset = take * page;
	const res = await fetch(
		`https://naszsklep-api.vercel.app/api/products?take=${take}&offset=${offset}`,
	);
	return (await res.json()) as TProduct[];
};

export const getProductById = async (id: TProduct["id"]) => {
	const res = await fetch(`https://naszsklep-api.vercel.app/api/products/${id}`);
	return (await res.json()) as TProduct;
};
