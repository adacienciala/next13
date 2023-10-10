import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Stripe from "stripe";

import { getCartById } from "@/api/cart/getOrCreateCart";

export const handleStripePayment = async () => {
	"use server";

	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Missing STRIPE_SECRET_KEY env variable");
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-08-16",
		typescript: true,
	});

	const cart = await getCartById();
	if (!cart) {
		return;
	}

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		metadata: {
			cartId: cart.id,
		},
		line_items: cart.orderItems
			.map(
				(item) =>
					item.product && {
						price_data: {
							currency: "usd",
							product_data: {
								name: item.product.name,
								description: item.product.description,
								images: item.product.images.map((i) => i.url),
							},
							unit_amount: item.product.price,
						},
						quantity: item.quantity,
					},
			)
			.filter(Boolean) as Stripe.Checkout.SessionCreateParams.LineItem[],
		mode: "payment",
		success_url: `${process.env.APP_URL}/cart/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${process.env.APP_URL}/cart/canceled`,
	});
	if (session.url) {
		cookies().set("cartId", "");
		redirect(session.url);
	}
};
