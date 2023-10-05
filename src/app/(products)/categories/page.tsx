import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Awesome Categories",
};

export default async function CategoriesPage() {
	return (
		<div>
			<h1>Categories:</h1>
			<ul>
				<li>
					<Link href="/categories/t-shirts/1">t-shirts</Link>
				</li>
				<li>
					<Link href="/categories/accessories/1">accessories</Link>
				</li>
				<li>
					<Link href="/categories/hoodies/1">hoodies</Link>
				</li>
			</ul>
		</div>
	);
}
