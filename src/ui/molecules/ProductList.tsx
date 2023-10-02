import Link from "next/link";
import { notFound } from "next/navigation";

import { type TProduct } from "@/types";
import { Product } from "@/ui/molecules/Product";

export const ProductList = async ({ products }: { products?: TProduct[] }) => {
	if (!products || products.length === 0) return notFound();

	return (
		<ul data-testid="products-list" className="flex flex-wrap gap-6">
			{products.map((product) => (
				<li key={product.id}>
					<Link href={`/product/${product.id}`}>
						<Product product={product} />
					</Link>
				</li>
			))}
		</ul>
	);
};
