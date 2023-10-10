import Image from "next/image";

import { type ReviewItemFragment } from "@/gql/graphql";

export const ReviewListItem = ({ review }: { review: ReviewItemFragment }) => {
	const avatar = review.createdBy?.picture ? (
		<Image
			width={16}
			height={16}
			className="rounded-full"
			src={review.createdBy.picture}
			alt="User avatar"
		/>
	) : (
		<div className="relative inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gray-100">
			<span className="font-medium text-slate-600 ">
				{review.name.charAt(0)}
				{review.name.split(" ")[1]?.charAt(0)}
			</span>
		</div>
	);

	return (
		<div>
			<div className="mt-4 flex content-center items-center gap-4">
				{avatar}
				<div className="flex flex-col content-center">
					<div className="font-bold">{review.name}</div>
					<div>{review.rating} / 5</div>
				</div>
			</div>
			<div className="mt-4 font-bold">{review.headline}</div>
			<div className="text-sm italic text-slate-500">{review.content}</div>
		</div>
	);
};
