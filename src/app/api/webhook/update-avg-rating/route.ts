import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest } from "next/server";

import { getReviewsForProduct } from "@/api/review/getReviewsForProduct";
import { ProductUpdateAverageRatingDocument } from "@/gql/graphql";
import { executeGraphql } from "@/lib/graphql";

type THygraphHookReviewCreate = {
	operation: string;
	data: {
		product: { id: string };
	};
};

export async function POST(request: NextRequest): Promise<Response> {
	const body = (await request.json()) as THygraphHookReviewCreate;
	const productId = body.data.product.id;

	const reviews = await getReviewsForProduct(productId);

	if (!reviews) {
		return new Response("Product has no reviews", { status: 404 });
	}

	try {
		let averageRating = 0;

		if (reviews.length > 0) {
			const total = reviews.reduce((acc, review) => {
				return acc + review.rating;
			}, 0);

			averageRating = Number((total / reviews.length).toFixed(1));
		}

		const averageRatingResponse = await executeGraphql({
			query: ProductUpdateAverageRatingDocument,
			variables: {
				productId: body.data.product.id,
				averageRating,
			},
			cache: "no-store",
		});

		if (!averageRatingResponse.updateProduct) {
			return new Response("Invalid product ID", { status: 400 });
		}

		revalidatePath(`/product/${body.data.product.id}`);
		revalidateTag("products");

		return new Response(averageRatingResponse.updateProduct?.id, { status: 201 });
	} catch (e) {
		return new Response(`Rating not updated for product ${body.data.product.id}`, { status: 400 });
	}
}
