import { Suspense } from "react";

import { ProductList } from "@/ui/molecules/ProductList";

export default function ProductDetailsLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="grid min-h-screen w-full grid-cols-12 gap-x-8 bg-white">
			<main className="col-span-8 px-8 py-4 shadow-xl">{children}</main>
			<aside className="col-span-4 px-8 py-4 shadow-xl">
				<h2 className="mb-4 text-xl font-bold">Suggested products</h2>
				<Suspense>
					<ProductList data-testid="related-products" page={1} take={4} />
				</Suspense>
			</aside>
		</div>
	);
}
