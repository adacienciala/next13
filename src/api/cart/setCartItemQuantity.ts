import { CartSetProductQuantityDocument } from "@/gql/graphql";
import { executeGraphql } from "@/lib/graphql";

export const setCartItemQuantity = async (itemId: string, quantity: number) => {
	await executeGraphql({
		query: CartSetProductQuantityDocument,
		variables: {
			itemId,
			quantity: quantity,
		},
		cache: "no-store",
	});
};
