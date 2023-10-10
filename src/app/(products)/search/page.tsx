import { type Metadata } from "next";

import { getProductsSearch } from "@/api/products/getProducts";
import { ProductList } from "@/ui/molecules/ProductList";

type TSearchPaginationPage = {
	searchParams: {
		query: string;
	};
};

export const metadata: Metadata = {
	title: "Awesome Search",
};

export default async function SearchPaginationPage({ searchParams }: TSearchPaginationPage) {
	const { products } = await getProductsSearch({
		take: 100,
		search: searchParams.query,
	});

	if (products.length === 0) {
		return <h1>No products found</h1>;
	}

	return (
		<>
			<ProductList products={products} />
		</>
	);
}
