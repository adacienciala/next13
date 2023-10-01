import Link from "next/link";
import { notFound } from "next/navigation";

import { getProducts, getProductsByCategory } from "@/api/getProducts";
import { Product } from "@/ui/molecules/Product";

export const ProductList = async ({
	page,
	take,
	category,
}: {
	page: number;
	take?: number;
	category?: string;
}) => {
	const apiPage = page - 1;
	let data;
	if (category) {
		const { products } =
			(await getProductsByCategory({
				slug: category,
				page: apiPage,
				take,
			})) || {};

		data = products;
	} else {
		const { products } = await getProducts({
			page: apiPage,
			take,
		});
		data = products;
	}

	if (!data || data.length === 0) return notFound();

	return (
		<ul data-testid="products-list" className="flex flex-wrap gap-6">
			{data.map((product) => (
				<li key={product.id}>
					<Link href={`/product/${product.id}`}>
						<Product product={product} />
					</Link>
				</li>
			))}
		</ul>
	);
};
