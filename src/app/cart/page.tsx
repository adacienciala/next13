import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getCartById } from "@/api/cart/getOrCreateCart";
import { handleStripePayment } from "@/api/cart/handleStripePayment";
import { formatMoney } from "@/lib/formatMoney";
import { AdjustableQuantity } from "@/ui/molecules/AdjustableQuantity";
import { ButtonRemove } from "@/ui/molecules/ButtonRemove";

export default async function CartPage() {
	const cartId = cookies().get("cartId")?.value;
	if (!cartId) {
		redirect("/");
	}
	const cart = await getCartById(cartId);

	if (!cart) {
		redirect("/");
	}

	return (
		<div>
			<div className="mb-4 flex items-center gap-3">
				<h1 className="text-2xl font-bold">Cart</h1>
				<Link className="underline" href="/cart/details">
					[details]
				</Link>
			</div>
			<table className="mb-4 w-full table-auto border-separate rounded-md border border-slate-400 p-2 text-left [border-spacing:0.75rem]">
				<thead>
					<tr className="text-sm font-semibold uppercase  text-slate-700">
						<th>Product</th>
						<th>Name</th>
						<th>Quantity</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{cart.orderItems.map(
						({ product, quantity, id }) =>
							product && (
								<tr key={product.id}>
									<td>
										{product.images[0]?.url && (
											<Image
												height={200}
												width={100}
												src={product.images[0].url}
												alt={product.name}
											/>
										)}
									</td>
									<td>{product.name}</td>
									<td>
										<AdjustableQuantity quantity={quantity} itemId={id} />
									</td>
									<td>{formatMoney(product.price)}</td>
									<td>
										<ButtonRemove itemId={id} />
									</td>
								</tr>
							),
					)}
				</tbody>
			</table>
			<form action={handleStripePayment} className="ml-auto">
				<button
					type="submit"
					className="rounded-sm border bg-slate-100 px-8 py-2 shadow-sm transition-colors hover:bg-slate-200"
				>
					Pay
				</button>
			</form>
		</div>
	);
}
