import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Awesome Collections",
};

// TODO: Get collections dynamically

export default async function CollectionsPage() {
	return (
		<div>
			<h1>Collections:</h1>
			<ul>
				<li>
					<Link href="/collections/coll-1/1">coll-1</Link>
				</li>
				<li>
					<Link href="/collections/coll-2/1">coll-2</Link>
				</li>
				<li>
					<Link href="/collections/coll-3/1">coll-3</Link>
				</li>
			</ul>
		</div>
	);
}
