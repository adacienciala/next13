import Stripe from "stripe";

export default async function CartSuccessPage({
	searchParams,
}: {
	searchParams: { session_id: string };
}) {
	if (!process.env.STRIPE_SECRET_KEY || !searchParams.session_id) {
		return null;
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-08-16",
		typescript: true,
	});

	const stripeCheckoutSession = await stripe.checkout.sessions.retrieve(searchParams.session_id);

	return (
		<>
			<div>Status: {stripeCheckoutSession.status}</div>
			<div>Payment status: {stripeCheckoutSession.payment_status}</div>
			<div>Cart: {stripeCheckoutSession.metadata?.cartId}</div>
		</>
	);
}
