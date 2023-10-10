/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/server";

import { getProductById } from "@/api/products/getProducts";
import { type TProductDetailsPage } from "@/app/product/[productId]/page";

// Route segment config
export const runtime = "edge";

export const generateImageMetadata = async ({ params }: TProductDetailsPage) => {
	const product = await getProductById(params.productId);
	return (
		product && [
			{
				contentType: "image/png",
				size: { width: 1200, height: 600 },
				id: "small",
				alt: product.name,
			},
		]
	);
};

export default async function OpenGraphImage({ params }: TProductDetailsPage) {
	const product = await getProductById(params.productId);
	return (
		product &&
		new ImageResponse(
			(
				<div
					style={{
						flexDirection: "row",
						height: "100%",
						width: "100%",
						display: "flex",
						alignItems: "center",
						backgroundColor: "white",
					}}
				>
					<div tw="flex w-1/2 items-center justify-center overflow-hidden">
						{product.image && <img src={product.image} alt={product.name} />}
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							maxWidth: "50%",
							justifyContent: "flex-start",
						}}
					>
						<p tw="text-lg text-stone-400">{product.category}</p>
						<p tw="text-2xl font-bold">{product.name.trim()}</p>
						<p tw="text-sm">{product.description}</p>
						<p tw="mt-24 text-sm">Awesome Shop Mate Inc. © </p>
					</div>
				</div>
			),
		)
	);
}
