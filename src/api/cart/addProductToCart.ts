import { CartAddProductDocument, ProductsGetByIdDocument } from "@/gql/graphql";
import { executeGraphql } from "@/lib/graphql";

export const addProductToCart = async (cartId: string, productId: string) => {
	const { product } = await executeGraphql({
		query: ProductsGetByIdDocument,
		variables: { id: productId },
	});
	if (!product) {
		throw new Error(`Product with id ${productId} not found`);
	}

	await executeGraphql({
		query: CartAddProductDocument,
		variables: {
			orderId: cartId,
			productId,
			total: product.price,
		},
		cache: "no-store",
	});
};
