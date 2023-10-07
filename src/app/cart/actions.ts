"use server";

import { removeItemFromCart } from "@/api/cart/removeItemFromCart";
import { setCartItemQuantity } from "@/api/cart/setCartItemQuantity";

export const changeItemQuantity = async (itemId: string, quantity: number) => {
	await setCartItemQuantity(itemId, quantity);
};

export const removeItem = async (itemId: string) => {
	await removeItemFromCart(itemId);
};
