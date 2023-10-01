import { type Metadata } from "next";

export const metadata: Metadata = {
	title: "Awesome Categories",
};

export default async function CategoriesPage() {
	return (
		<div>
			<h1>Categories: something is ther for sure</h1>
		</div>
	);
}
