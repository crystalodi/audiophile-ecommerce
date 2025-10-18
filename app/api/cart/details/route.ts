// app/api/cart/details/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getCartDetail } from "@/sanity/lib/api";

export async function POST(request: NextRequest) {
	try {
		const { slugs } = await request.json();

		if (!Array.isArray(slugs) || slugs.length === 0) {
			return NextResponse.json(
				{ error: "Invalid slugs array" },
				{ status: 400 }
			);
		}

		const products = await getCartDetail(slugs);

		return NextResponse.json(products);
	} catch (error) {
		console.error("Error fetching cart details:", error);
		return NextResponse.json(
			{ error: "Failed to fetch cart details" },
			{ status: 500 }
		);
	}
}
