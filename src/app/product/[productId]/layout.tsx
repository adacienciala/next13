import { Suspense } from "react";

import { getProducts } from "@/api/products/getProducts";
import { ProductList } from "@/ui/molecules/ProductList";

export default async function ProductDetailsLayout({ children }: { children: React.ReactNode }) {
	const { products } = await getProducts({
		take: 4,
	});

	return (
		<div className="grid min-h-screen w-full grid-cols-12 gap-x-8 bg-white">
			<main className="col-span-8 px-8 py-4 shadow-xl">{children}</main>
			<aside className="col-span-4 px-8 py-4 shadow-xl" data-testid="related-products">
				<h2 className="mb-4 text-xl font-bold">Suggested products</h2>
				<Suspense>
					<ProductList products={products} />
				</Suspense>
			</aside>
		</div>
	);
}
