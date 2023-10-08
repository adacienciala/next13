import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { getProducts } from "@/api/products/getProducts";
import { DEFAULT_TAKE } from "@/app/(products)/products/utils";
import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/molecules/ProductList";

// export const dynamic = "force-dynamic";

type TAllProductsPaginationPage = {
	params: {
		page: string;
	};
};

export const metadata: Metadata = {
	title: "Awesome Products",
};

// export const generateStaticParams = async () => {
// 	const total = await getTotal();
// 	const pages = Math.ceil(total / DEFAULT_TAKE);
// 	return [...Array(pages).keys()].map((i) => {
// 		page: i.toString();
// 		total;
// 	});
// };

export default async function AllProductsPaginationPage({ params }: TAllProductsPaginationPage) {
	const pageNr = Number(params.page) - 1;
	if (pageNr < 0) return notFound();

	const { products, total } = await getProducts({
		page: pageNr,
		take: DEFAULT_TAKE,
	});

	const pages = total ? Math.ceil(total / DEFAULT_TAKE) : 0;

	return (
		<>
			<ProductList products={products} />
			<Pagination pages={pages} href={`/products`} />
		</>
	);
}
