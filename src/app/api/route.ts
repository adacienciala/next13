import { NextResponse, type NextRequest } from "next/server";

export const revlidate = 10;

export async function GET(request: NextRequest): Promise<Response> {
	return NextResponse.json(request.headers);
}
