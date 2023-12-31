import { type Route } from "next";

import { ActiveLink } from "@/ui/atoms/ActiveLink";

export const PaginationTile = <T extends string>({
	page,
	href,
}: {
	page: number | string;
} & { href: Route<T> }) => {
	const current =
		"relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";

	const defaultClass =
		"relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0";

	const normalizedUrl = page === 1 ? href : `${href}/${page}`;

	return (
		<ActiveLink href={normalizedUrl as Route} className={defaultClass} activeClassName={current}>
			{page}
		</ActiveLink>
	);
};
