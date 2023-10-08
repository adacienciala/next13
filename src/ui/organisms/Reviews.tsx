"use client";

import { experimental_useOptimistic as useOptimistic } from "react";
import { v4 as uuid } from "uuid";

import { addProductReviewAction } from "@/app/cart/actions";
import { type ProductItemFragment, type ReviewItemFragment } from "@/gql/graphql";
import { ReviewListItem } from "@/ui/atoms/ReviewListItem";
import { ReviewForm } from "@/ui/organisms/ReviewForm";

export const Reviews = ({
	productId,
	reviews,
}: {
	productId: ProductItemFragment["id"];
	reviews: ReviewItemFragment[];
}) => {
	const [optimisticReviews, setOptimisticReviews] = useOptimistic(
		reviews,
		(state, newReview: ReviewItemFragment) => [newReview, ...state],
	);

	const reviewAction = async (formData: FormData) => {
		const review: Omit<ReviewItemFragment, "id"> = {
			headline: String(formData.get("headline")),
			content: String(formData.get("content")),
			rating: Number(formData.get("rating")),
			name: String(formData.get("name")),
			email: String(formData.get("email")),
		};
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		setOptimisticReviews({ id: uuid(), ...review });
		await addProductReviewAction(productId, review);
	};

	return (
		<div>
			<div className="mt-4 flex flex-row">
				<ReviewForm action={reviewAction} />
				<div
					className="ml-4 flex grow flex-col
					gap-8 divide-y divide-slate-200"
				>
					<h1 className="text-2xl font-bold">Reviews ({reviews.length})</h1>
					{optimisticReviews.map((r) => (
						<ReviewListItem review={r} key={r.id} />
					))}
				</div>
			</div>
		</div>
	);
};
