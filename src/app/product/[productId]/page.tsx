import { Check } from "lucide-react";
import { type Metadata } from "next";
import Image from "next/image";

import { getProductById } from "@/api/getProducts";

export const generateMetadata = async ({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> => {
	const product = await getProductById(params.productId);
	return {
		title: product.title,
		description: product.description,
	};
};

export default async function ProductDetailsPage({ params }: { params: { productId: string } }) {
	const product = await getProductById(params.productId);

	return (
		<>
			<p className="mb-4 text-2xl font-bold">Product Details</p>
			<h1>{product.title}</h1>
			<div className="flex h-96 items-center justify-center overflow-hidden">
				<Image height={400} width={200} src={product.image} alt={product.title} />
			</div>
			<p className="mt-4">{product.description}</p>
			<p className="mt-4">
				{new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD",
				}).format(product.price)}
			</p>
			<p className="row-auto mt-4 flex">
				<Check color="green" /> In stock
			</p>
		</>
	);
}
