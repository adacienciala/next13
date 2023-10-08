import Link from "next/link";

export default function NotFound() {
	return (
		<div>
			<h2 className="my-36 text-center text-2xl font-bold text-gray-900 dark:text-white md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
				404 Not Found
			</h2>
			<p className="text-center underline">
				<Link href="/">Go Home</Link>
			</p>
		</div>
	);
}
