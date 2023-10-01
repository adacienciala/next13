import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/molecules/ProductList";

export const metadata: Metadata = {
	title: "Awesome Products",
};

export const generateStaticParams = async () => {
	const allPages = [];
	for (let i = 1; i < 50; i++) {
		allPages.push({
			page: i.toString(),
		});
	}
	return allPages;
};

export default async function CategoryProductsPaginationPage({
	params,
}: {
	params: { page: string; category: string };
}) {
	const pageNr = Number(params.page);
	if (pageNr < 1) return notFound();

	return (
		<>
			<ProductList page={pageNr} category={params.category} />
			<Pagination href={`/categories/${params.category}`} />
		</>
	);
}
