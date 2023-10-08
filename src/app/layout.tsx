import { ShoppingCart } from "lucide-react";
import { type Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

import { ActiveLink } from "@/ui/atoms/ActiveLink";

import { getCartById } from "@/api/cart/getOrCreateCart";
import { getCategories } from "@/api/getCategories";
import { SearchInput } from "@/ui/molecules/SearchInput";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Awesome Shop Mate",
};

export default async function RootLayout({
	children,
	modal,
}: {
	children: React.ReactNode;
	modal: React.ReactNode;
}) {
	const categories = await getCategories();

	const cart = await getCartById();
	const cartQuantity = cart?.orderItems.length ?? 0;

	return (
		<html lang="en">
			<body className={inter.className}>
				<h3 className="mt-4 text-center">Awesome Shop Mate</h3>
				<div className="row flex items-center justify-between border-b-2">
					<nav>
						<ul className="flex gap-4 border-b-0 border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
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
					</nav>
					<SearchInput className="ml-auto w-96" />
					<Link href="/cart/sidebar" className="mx-8 flex items-center">
						<ShoppingCart />
						<span className="mx-2 text-sm font-medium">{cartQuantity}</span>
						<span className="sr-only">items in cart, view cart</span>
					</Link>
				</div>
				<section className="p-12">{children}</section>
				<footer className="border-t border-gray-200 bg-gray-50 p-12 text-center text-sm font-medium text-gray-500 dark:border-t dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
					<p>Awesome Shop Mate Inc. © 2023</p>
				</footer>
				{modal}
			</body>
		</html>
	);
}
