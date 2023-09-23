import Link from "next/link";

import { getProducts } from "@/api/getProducts";
import { Product } from "@/ui/molecules/Product";

export const ProductList = async ({ page, take }: { page: number; take?: number }) => {
	const apiPage = page - 1;
	const products = await getProducts({ page: apiPage, take });
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
