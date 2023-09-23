"use client";

import clsx, { type ClassValue } from "clsx";
import { type Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TActiveLink<T extends string> = {
	children: React.ReactNode;
	exact?: boolean;
	className?: ClassValue;
	activeClassName?: ClassValue;
} & { href: Route<T> };

export const ActiveLink = <T extends string>({
	children,
	href,
	exact = true,
	className = "text-blue-600 hover:text-blue-800 dark:text-blue-400",
	activeClassName = "border-b border-blue-600",
}: TActiveLink<T>) => {
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
