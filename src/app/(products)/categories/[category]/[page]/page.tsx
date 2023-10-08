import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { getCategories } from "@/api/products/getCategories";
import { getProductsByCategory } from "@/api/products/getProducts";
import { DEFAULT_TAKE } from "@/app/(products)/products/utils";
import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/molecules/ProductList";

// export const dynamic = "force-dynamic";

type TCategoryProductsPaginationPage = {
	params: {
		page: string;
		category: string;
	};
};

export const generateMetadata = async ({
	params,
}: TCategoryProductsPaginationPage): Promise<Metadata> => {
	const categories = await getCategories();
	return {
		title: categories.find((c) => c.slug === params.category)?.name || "Awesome Category",
	};
};

// export const generateStaticParams = async ({ params }: TCategoryProductsPaginationPage) => {
// 	const total = await getTotal({ category: params.category });
// 	const pages = Math.ceil(total / DEFAULT_TAKE);
// 	return [...Array(pages).keys()].map((i) => {
// 		page: i.toString();
// 	});
// };

export default async function CategoryProductsPaginationPage({
	params,
}: TCategoryProductsPaginationPage) {
	const pageNr = Number(params.page) - 1;
	if (pageNr < 0) return notFound();

	const { products, total } = await getProductsByCategory({
		slug: params.category,
		page: pageNr,
		take: DEFAULT_TAKE,
	});

	const pages = total ? Math.ceil(total / DEFAULT_TAKE) : 0;

	return (
		<>
			{products && products[0] && <h1>{products[0].category}</h1>}
			<ProductList products={products} />
			<Pagination pages={pages} href={`/categories/${params.category}`} />
		</>
	);
}
