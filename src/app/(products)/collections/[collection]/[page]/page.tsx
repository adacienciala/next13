import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { getCollections } from "@/api/products/getCollections";
import { getProductsByCollection } from "@/api/products/getProducts";
import { DEFAULT_TAKE } from "@/app/(products)/products/utils";
import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/molecules/ProductList";

// export const dynamic = "force-dynamic";

type TCollectionProductsPaginationPage = {
	params: {
		page: string;
		collection: string;
	};
};

export const generateMetadata = async ({
	params,
}: TCollectionProductsPaginationPage): Promise<Metadata> => {
	const collections = await getCollections();
	return {
		title: collections.find((c) => c.slug === params.collection)?.name || "Awesome Collection",
	};
};

// export const generateStaticParams = async ({ params }: TCollectionProductsPaginationPage) => {
// 	const total = await getTotal({ collection: params.collection });
// 	const pages = Math.ceil(total / DEFAULT_TAKE);
// 	return [...Array(pages).keys()].map((i) => {
// 		page: i.toString();
// 	});
// };

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
		take: DEFAULT_TAKE,
	});

	const pages = total ? Math.ceil(total / DEFAULT_TAKE) : 0;

	return (
		<>
			{products && products[0] && <h1>{products[0].collection}</h1>}
			<ProductList products={products} />
			<Pagination pages={pages} href={`/categories/${params.collection}`} />
		</>
	);
}
