import { cookies } from "next/headers";

import { CartCreateDocument, CartGetByIdDocument } from "@/gql/graphql";
import { executeGraphql } from "@/lib/graphql";

export const getOrCreateCart = async () => {
	const cart = await getCartById();
	if (cart) {
		return cart;
	}

	const { createOrder: newCart } = await executeGraphql({
		query: CartCreateDocument,
		cache: "no-store",
	});
	if (!newCart) {
		throw new Error("Failed to create cart");
	}

	cookies().set("cartId", newCart.id, {
		httpOnly: true,
		sameSite: "lax",
	});
	return newCart;
};

export const getCartById = async (id?: string) => {
	const cartId = id ?? cookies().get("cartId")?.value;
	if (cartId) {
		const { order: cart } = await executeGraphql({
			query: CartGetByIdDocument,
			variables: {
				id: cartId,
			},
			next: { tags: ["cart"] },
			cache: "no-store",
		});
		return cart;
	}
	return undefined;
};
