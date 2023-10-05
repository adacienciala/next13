"use client";

import { type Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { type TProduct } from "@/types";

export const ProductVariants = ({ product }: { product: TProduct }) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const defaultValue = searchParams.get("variant") || "default";

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);
			params.set(name, value);

			return params.toString();
		},
		[searchParams],
	);

	if (!product.variants || !product.variants[0]) return;
	return (
		<select
			className="ml-2 rounded-md border-2 border-gray-700 p-1 text-gray-700 outline-none"
			name="variant"
			onChange={(event) =>
				router.push(`${pathname}?${createQueryString("variant", event.target.value)}` as Route)
			}
			defaultValue={defaultValue}
		>
			<option value={"default"} defaultChecked disabled className="ml-2">
				-
			</option>
			{product.variants.map((v) => (
				<option value={v.name} key={v.id} className="ml-2">
					{v.name}
				</option>
			))}
		</select>
	);
};
