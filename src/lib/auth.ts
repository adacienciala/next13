import { type NextRequest } from "next/server";

export const isAuthenticated = (request: NextRequest) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const _token = request.headers.get("Authorization")?.split(" ")[0];
	return true;
};
