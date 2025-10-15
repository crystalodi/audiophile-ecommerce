import { NextRequest, NextResponse } from "next/server";
import { getPreFooterContent } from "@/sanity/lib/api";

export async function POST(request: NextRequest) {
	try {
		const preFooterContent = await getPreFooterContent();

		if (!preFooterContent) {
			return NextResponse.json(
				{ error: "Pre-footer content not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(preFooterContent);
	} catch (error) {
		console.error("Error in pre-footer content API:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
