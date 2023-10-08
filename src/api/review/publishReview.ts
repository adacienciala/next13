import { ReviewPublishDocument } from "@/gql/graphql";
import { executeGraphql } from "@/lib/graphql";

export const publishReview = async (id: string) => {
	await executeGraphql({
		query: ReviewPublishDocument,
		variables: { id },
	});
};
