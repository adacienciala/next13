import { type Route } from "next";

import { authMiddleware } from "@clerk/nextjs";

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

export default authMiddleware({
	publicRoutes: [
		"/",
		"/search",
		"/cart(.*)",
		"/categories(.*)",
		"/collections(.*)",
		"/products(.*)",
		"/product/(.*)" as Route,
	],
});
