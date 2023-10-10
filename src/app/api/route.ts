import { NextResponse, type NextRequest } from "next/server";

export const revalidate = 10;

export async function GET(request: NextRequest): Promise<Response> {
	return NextResponse.json(request.headers);
}
