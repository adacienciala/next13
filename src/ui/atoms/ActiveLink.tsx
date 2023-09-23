"use client";

import clsx, { type ClassValue } from "clsx";
import { type Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const ActiveLink = ({
	children,
	href,
	exact = true,
	className = "text-blue-600 hover:text-blue-800 dark:text-blue-400",
	activeClassName = "border-b border-blue-600",
}: {
	children: React.ReactNode;
	href: Route<string>;
	exact?: boolean;
	className?: ClassValue;
	activeClassName?: ClassValue;
}) => {
	const pathname = usePathname();
	const isActive = exact ? pathname === href : pathname.startsWith(href);
	return (
		<Link
			aria-current={isActive ? "page" : undefined}
			className={clsx(className, isActive && activeClassName)}
			href={href}
		>
			{children}
		</Link>
	);
};
