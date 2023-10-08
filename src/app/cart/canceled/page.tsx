export default async function CartCanceledPage() {
	if (!process.env.STRIPE_SECRET_KEY) {
		return null;
	}

	return (
		<>
			<div>Status: Cancelled</div>
		</>
	);
}
