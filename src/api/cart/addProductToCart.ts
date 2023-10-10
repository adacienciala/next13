import { CartUpsertProductDocument, ProductsGetByIdDocument } from "@/gql/graphql";
import { executeGraphql } from "@/lib/graphql";

export const addProductToCart = async (
	cartId: string,
	productId: string,
	quantity: number,
	total: number,
	orderItemId?: string,
) => {
	const { product } = await executeGraphql({
		query: ProductsGetByIdDocument,
		variables: { id: productId },
	});
	if (!product) {
		throw new Error(`Product with id ${productId} not found`);
	}

	await executeGraphql({
		query: CartUpsertProductDocument,
		variables: {
			cartId,
			productId,
			quantity,
			total,
			orderItemId,
		},
		cache: "no-store",
	});
};
