import { type Metadata } from "next";
import { Inter } from "next/font/google";

import { ActiveLink } from "@/ui/atoms/ActiveLink";

import { getCategories } from "@/api/getCategories";
import { SearchInput } from "@/ui/molecules/SearchInput";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Awesome Shop Mate",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const categories = await getCategories();

	return (
		<html lang="en">
			<body className={inter.className}>
				<h3 className="mt-4 text-center">Awesome Shop Mate</h3>
				<nav className="row flex justify-between">
					<ul className="flex gap-4 border-b border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
						<li>
							<ActiveLink
								className={"text-blue-600 hover:text-blue-800 dark:text-blue-400"}
								activeClassName={"border-b border-blue-600"}
								href="/"
							>
								Home
							</ActiveLink>
						</li>
						<li>
							<ActiveLink href="/products" exact={false}>
								All
							</ActiveLink>
						</li>
						{categories.map((cat) => (
							<li key={cat.slug}>
								<ActiveLink href={`/categories/${cat.slug}/1`} exact={false}>
									{cat.name}
								</ActiveLink>
							</li>
						))}
					</ul>
					<SearchInput />
				</nav>
				<section className="p-12">{children}</section>
				<footer className="border-t border-gray-200 bg-gray-50 p-12 text-center text-sm font-medium text-gray-500 dark:border-t dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
					<p>Awesome Shop Mate Inc. © 2023</p>
				</footer>
			</body>
		</html>
	);
}
