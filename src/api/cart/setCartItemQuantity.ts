import { CartSetProductQuantityDocument } from "@/gql/graphql";
import { executeGraphql } from "@/lib/graphql";

export const setCartItemQuantity = async (itemId: string, price: number, quantity: number) => {
	await executeGraphql({
		query: CartSetProductQuantityDocument,
		variables: {
			itemId,
			quantity,
			total: price * quantity,
		},
		cache: "no-store",
	});
};
