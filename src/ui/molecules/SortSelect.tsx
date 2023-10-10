"use client";
import { type Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { type ProductOrderByInput } from "@/gql/graphql";

type OrderByType = {
	label: string;
	value: ProductOrderByInput;
};

const orderList: OrderByType[] = [
	{ label: "↑ Price", value: "price_ASC" },
	{ label: "↓ Price", value: "price_DESC" },
	{ label: "↑ Rating", value: "averageRating_ASC" },
	{ label: "↓ Rating", value: "averageRating_DESC" },
];

export const SortSelect = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
		router.push(`${pathname}?sort=${event.target.value}` as Route);

	return (
		<>
			<select
				name="sort-by"
				value={searchParams.get("sort") || "Sort by"}
				onChange={handleOnChange}
				className="mb-8 block w-32 cursor-pointer appearance-none rounded-md border-2 border-slate-600 px-2 py-1 text-sm font-light shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
			>
				<option disabled>Sort by</option>
				{orderList.map(({ label, value }) => (
					<option
						key={value}
						value={value}
						data-testid={value.includes("price") ? "sort-by-price" : "sort-by-rating"}
					>
						{label}
					</option>
				))}
			</select>
		</>
	);
};
