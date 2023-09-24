/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { executeGraphql } from "@/lib/graphql";
import { type TProduct } from "@/types";

export const getProducts = async (params?: { page?: number; take?: number }) => {
	const { page = 0, take = 20 } = params ?? {};
	const query = /* GraphQL */ `
		query Products($pagination: PaginationArg) {
			products(pagination: $pagination) {
				data {
					attributes {
						slug
						name
						description
						price
						categories {
							data {
								attributes {
									name
								}
							}
						}
						weightedRating
						images {
							data {
								attributes {
									url
								}
							}
						}
					}
				}
			}
		}
	`;
	const res: any = await executeGraphql(query, {
		pagination: {
			page,
			pageSize: take,
		},
	});
	const results = res.products.data;
	return results.map((p) => ({
		id: p.attributes.slug,
		title: p.attributes.name,
		price: p.attributes.price,
		description: p.attributes.description,
		category: p.attributes.categories.data[0].attributes.name || "",
		rating: p.attributes.weightedRating?.toString() || "-",
		image: "https://api.hyperfunctor.com" + p.attributes.images.data[0].attributes.url,
		longDescription: p.attributes.description,
	})) as TProduct[];
};

export const getProductById = async (id: TProduct["id"]) => {
	const res = await fetch(`https://naszsklep-api.vercel.app/api/products/${id}`);
	return (await res.json()) as TProduct;
};
