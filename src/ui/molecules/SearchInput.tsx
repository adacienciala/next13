"use client";
import clsx, { type ClassValue } from "clsx";
import { Search } from "lucide-react";
import { type Route } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type ChangeEvent } from "react";

import { useDebounce } from "@/lib/useDebounce";
import { Input } from "@/ui/atoms/Input";

export const SearchInput = ({ className }: { className?: ClassValue }) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [query, setQuery] = useState(searchParams.get("query") || "");
	const value = useDebounce(query, 500);

	const handleSearchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value);
	};

	const handleSearchOnSubmit = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		router.push(`/search?query=${query?.toString()}` as Route);
	};

	useEffect(() => {
		if (value) {
			router.push(`/search?query=${query?.toString()}` as Route);
		}
		// Otherwise the debounce is not working correctly.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	return (
		<div className={clsx("row flex items-center", className)}>
			<Search size={16} className="pointer-events-none w-10" />
			<Input
				placeholder="Search"
				type="search"
				name="search"
				autoComplete="off"
				role="searchbox"
				value={query}
				onChange={handleSearchOnChange}
				onSubmit={handleSearchOnSubmit}
			/>
		</div>
	);
};
