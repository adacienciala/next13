import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ActiveLink } from "@/ui/atoms/ActiveLink";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Awesome Shop Mate",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<h2 className="mt-4 text-center">Awesome Shop Mate</h2>
				<nav>
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
							<ActiveLink href="/products">All</ActiveLink>
						</li>
					</ul>
				</nav>
				<section className="p-12">{children}</section>
				<footer className="border-t border-gray-200 bg-gray-50 p-12 text-center text-sm font-medium text-gray-500 dark:border-t dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
					<p>Awesome Shop Mate Inc. © 2023</p>
				</footer>
			</body>
		</html>
	);
}
