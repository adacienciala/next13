import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { getProductsByCategory } from "@/api/getProducts";
import { getTotal } from "@/api/getTotal";
import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/molecules/ProductList";

type TCategoryProductsPaginationPage = {
	params: {
		page: string;
		category: string;
	};
};

const CATEGORY_DEFAULT_TAKE = 4;

export const metadata: Metadata = {
	title: "Awesome Category Products",
};

export const generateStaticParams = async ({ params }: TCategoryProductsPaginationPage) => {
	const total = await getTotal({ category: params.category });
	const pages = Math.ceil(total / CATEGORY_DEFAULT_TAKE);
	return [...Array(pages).keys()].map((i) => {
		page: i.toString();
	});
};

export default async function CategoryProductsPaginationPage({
	params,
}: TCategoryProductsPaginationPage) {
	const pageNr = Number(params.page) - 1;
	if (pageNr < 0) return notFound();

	const { products, total } = await getProductsByCategory({
		slug: params.category,
		page: pageNr,
		take: CATEGORY_DEFAULT_TAKE,
	});

	const pages = total ? Math.ceil(total / CATEGORY_DEFAULT_TAKE) : 0;

	return (
		<>
			<ProductList products={products} />
			<Pagination pages={pages} href={`/categories/${params.category}`} />
		</>
	);
}
