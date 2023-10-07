import { CartRemoveItemDocument } from "@/gql/graphql";
import { executeGraphql } from "@/lib/graphql";

export const removeItemFromCart = async (itemId: string) => {
	return executeGraphql({
		query: CartRemoveItemDocument,
		variables: { itemId },
		cache: "no-store",
	});
};
