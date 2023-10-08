"use server";

import { ReviewGetByProductIdDocument, type ReviewItemFragment } from "@/gql/graphql";
import { executeGraphql } from "@/lib/graphql";

export const getReviewsForProduct = async (productId: string) => {
	const res = await executeGraphql({
		query: ReviewGetByProductIdDocument,
		variables: { id: productId },
		next: {
			tags: ["reviews"],
		},
	});
	return res.reviewsConnection.edges.map((e) => e.node) as ReviewItemFragment[];
};
