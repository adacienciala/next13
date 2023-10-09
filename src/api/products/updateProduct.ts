import { ProductUpdateAverageRatingDocument } from "@/gql/graphql";
import { executeGraphql } from "@/lib/graphql";

export const updateProductAverageRating = async (productId: string, averageRating: number) => {
	await executeGraphql({
		query: ProductUpdateAverageRatingDocument,
		variables: {
			productId,
			averageRating,
		},
		cache: "no-cache",
	});
};
