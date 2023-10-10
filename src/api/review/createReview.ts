import { ReviewCreateDocument, type ReviewItemFragment } from "@/gql/graphql";
import { executeGraphql } from "@/lib/graphql";

export const createReview = async (productId: string, data: Omit<ReviewItemFragment, "id">) => {
	const res = await executeGraphql({
		query: ReviewCreateDocument,
		variables: { productId, ...data },
	});
	return res.createReview?.id;
};
