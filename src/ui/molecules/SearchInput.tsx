"use client";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type ChangeEvent } from "react";

import { useDebounce } from "@/lib/useDebounce";
import { Input } from "@/ui/atoms/Input";

export const SearchInput = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [query, setQuery] = useState(searchParams.get("query") || "");
	const value = useDebounce(query, 500);

	const handleSearchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value);
	};

	const handleSearchOnSubmit = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		router.push(`/search?query=${query?.toString()}`);
	};

	useEffect(() => {
		if (value) {
			router.push(`/search?query=${query?.toString()}`);
		}
		// Otherwise the debounce is not working correctly.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	return (
		<div className="row mr-32 flex w-96 items-center">
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