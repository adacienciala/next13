import { Check } from "lucide-react";
import { type Metadata } from "next";
import { revalidateTag } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";

import { addProductToCart } from "@/api/cart/addProductToCart";
import { getOrCreateCart } from "@/api/cart/getOrCreateCart";
import { getProductById } from "@/api/getProducts";
import { formatMoney } from "@/lib/formatMoney";
import { ButtonAddToCart } from "@/ui/molecules/ButtonAddToCart";
import { ProductVariants } from "@/ui/molecules/ProductVariants";

export const generateMetadata = async ({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> => {
	const product = await getProductById(params.productId);
	return {
		title: product?.name,
		description: product?.description,
	};
};

export default async function ProductDetailsPage({ params }: { params: { productId: string } }) {
	const product = await getProductById(params.productId);

	if (!product) return notFound();

	const addProductToCartAction = async () => {
		"use server";
		const cart = await getOrCreateCart();
		await addProductToCart(cart.id, product.id);

		revalidateTag("cart");
	};

	return (
		<>
			<p className="mb-4 text-2xl font-bold">Product Details</p>
			<p className="mt-4 text-stone-400">{product.category}</p>
			<h1>{product.name.trim()}</h1>
			<div className="flex h-96 items-center justify-center overflow-hidden">
				{product.image && <Image height={400} width={200} src={product.image} alt={product.name} />}
			</div>
			<p className="mt-4">{product.description}</p>
			<p className="mt-4">
				{formatMoney(product.price)}
				<ProductVariants product={product} />
			</p>
			<p className="row-auto mt-4 flex">
				<Check color="green" /> In stock
			</p>
			<form action={addProductToCartAction}>
				<ButtonAddToCart />
			</form>
		</>
	);
}
