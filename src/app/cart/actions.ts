"use server";

import { revalidateTag } from "next/cache";

import { removeItemFromCart } from "@/api/cart/removeItemFromCart";
import { setCartItemQuantity } from "@/api/cart/setCartItemQuantity";
import { createReview } from "@/api/review/createReview";
import { publishReview } from "@/api/review/publishReview";
import { type ReviewItemFragment } from "@/gql/graphql";

export const changeItemQuantity = async (itemId: string, price: number, quantity: number) => {
	await setCartItemQuantity(itemId, price, quantity);
};

export const removeItem = async (itemId: string) => {
	await removeItemFromCart(itemId);
};

export const addProductReviewAction = async (
	productId: string,
	review: Omit<ReviewItemFragment, "id">,
) => {
	const reviewId = await createReview(productId, review);
	if (!reviewId) {
		throw TypeError("Something went wrong during the review creation!");
	}
	await publishReview(reviewId);
	revalidateTag("reviews");
};
