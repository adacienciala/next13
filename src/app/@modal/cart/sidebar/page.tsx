import Image from "next/image";

import { getCartById } from "@/api/cart/getOrCreateCart";
import { formatMoney } from "@/lib/formatMoney";
import { Overlay } from "@/ui/atoms/Overlay";
import { AdjustableQuantity } from "@/ui/molecules/AdjustableQuantity";

export default async function ModalCartSidebar() {
	const cart = await getCartById();

	if (!cart) {
		return <div>Nothing added to cart, yet.</div>;
	}

	return (
		<>
			<Overlay>
				<div className="absolute right-0 top-0 h-screen w-full max-w-md bg-white px-8 py-4">
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
										</tr>
									),
							)}
						</tbody>
					</table>
					<a
						href="/cart"
						className="w-full rounded-md border bg-slate-500 px-8 py-3 text-white shadow-slate-700 transition-shadow hover:bg-slate-700 hover:shadow-lg disabled:cursor-wait disabled:bg-slate-300"
					>
						Checkout
					</a>
				</div>
			</Overlay>
		</>
	);
}
