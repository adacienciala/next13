import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { getProducts } from "@/api/getProducts";
import { getTotal } from "@/api/getTotal";
import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/molecules/ProductList";

type TAllProductsPaginationPage = {
	params: {
		page: string;
		total: string;
	};
};

const DEFAULT_TAKE = 4;

export const metadata: Metadata = {
	title: "Awesome Products",
};

export const generateStaticParams = async () => {
	const total = await getTotal();
	const pages = Math.ceil(total / DEFAULT_TAKE);
	return [...Array(pages).keys()].map((i) => {
		page: i.toString();
		total;
	});
};

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
