import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { getProductsByCollection } from "@/api/getProducts";
import { getTotal } from "@/api/getTotal";
import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/molecules/ProductList";

type TCollectionProductsPaginationPage = {
	params: {
		page: string;
		collection: string;
	};
};

const COLLECTION_DEFAULT_TAKE = 4;

export const metadata: Metadata = {
	title: "Awesome Collection Products",
};

export const generateStaticParams = async ({ params }: TCollectionProductsPaginationPage) => {
	const total = await getTotal({ collection: params.collection });
	const pages = Math.ceil(total / COLLECTION_DEFAULT_TAKE);
	return [...Array(pages).keys()].map((i) => {
		page: i.toString();
	});
};

export default async function CollectionProductsPaginationPage({
	params,
}: {
	params: { page: string; collection: string };
}) {
	const pageNr = Number(params.page) - 1;
	if (pageNr < 0) return notFound();

	const { products, total } = await getProductsByCollection({
		slug: params.collection,
		page: pageNr,
		take: COLLECTION_DEFAULT_TAKE,
	});

	const pages = total ? Math.ceil(total / COLLECTION_DEFAULT_TAKE) : 0;

	return (
		<>
			<ProductList products={products} />
			<Pagination pages={pages} href={`/categories/${params.collection}`} />
		</>
	);
}