import { type Route } from "next";

import { PaginationTile } from "@/ui/atoms/PaginationTile";

export const Pagination = <T extends string>({
	href,
	pages,
}: {
	href: Route<T>;
	pages: number;
}) => {
	// const rightRoundedArrow =
	// 	"relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0";
	// const leftRoundedArrow =
	// 	"relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0";

	return (
		<div aria-label={`pagination${href.replaceAll("/", "-")}`}>
			<nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
				{/* <a href="#" className={leftRoundedArrow}>
					<div className="h-5 w-5" aria-hidden="true">
						←
					</div>
				</a> */}
				{[...Array(pages).keys()].map((page) => (
					<PaginationTile href={href} key={page} page={page + 1} />
				))}
				{/* <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
					...
				</span> */}
				{/* <a href="#" className={rightRoundedArrow}>
					<div className="h-5 w-5" aria-hidden="true">
						→
					</div>
				</a> */}
			</nav>
		</div>
	);
};
