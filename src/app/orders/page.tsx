import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getOrdersByEmail } from "@/api/orders/getOrdersByEmail";
import { fromApiToProduct } from "@/api/products/getProducts";
import { getUserEmail } from "@/lib/getUserEmail";
import { Product } from "@/ui/molecules/Product";

export default async function OrdersPage() {
	const user = await currentUser();
	if (!user) {
		redirect("/sign-in");
	}

	const email = getUserEmail(user);
	if (!email) {
		return <div>User does not have email</div>;
	}

	const orders = await getOrdersByEmail(email);

	return (
		<>
			<p className="mb-8 text-2xl font-bold text-slate-900">{user.firstName}&rsquo;s Orders</p>
			{orders.length === 0 ? (
				<div>No orders found</div>
			) : (
				<ul>
					{orders.map((order) => (
						<li key={order.id} className="mb-8 divide-y divide-slate-200">
							<div className="flex space-x-4 text-sm text-slate-700">
								<div>{order.id}</div>
								<div>
									<time dateTime={order.createdAt as string}>{order.createdAt as string}</time>
								</div>
							</div>
							<ul>
								{order.orderItems.map((item) => (
									<li className="mt-2" key={item.id}>
										<Product product={fromApiToProduct(item.product!)} />
									</li>
								))}
							</ul>
						</li>
					))}
				</ul>
			)}
		</>
	);
}
