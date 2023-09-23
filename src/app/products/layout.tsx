import { type ReactNode } from "react";

export default async function ProductsLayout({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen w-full bg-white">
			<main className="px-8 py-4 shadow-xl">{children}</main>
		</div>
	);
}
