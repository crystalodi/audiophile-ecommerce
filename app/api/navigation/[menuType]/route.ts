import { getNavigationMenu } from "@/sanity/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ menuType: string }> }
) {
	try {
		const { menuType } = await params;

		const validMenuTypes = ["header", "footer", "mobile", "content"];
		if (!validMenuTypes.includes(menuType)) {
			return NextResponse.json(
				{
					error: `Invalid menuType. Must be one of: ${validMenuTypes.join(", ")}`,
				},
				{ status: 400 }
			);
		}

		const navigationMenu = await getNavigationMenu(
			menuType as "header" | "footer" | "mobile" | "content"
		);

		if (!navigationMenu) {
			return NextResponse.json(
				{ error: `Navigation menu of type '${menuType}' not found` },
				{ status: 404 }
			);
		}

		return NextResponse.json(navigationMenu);
	} catch (error) {
		console.error("Error fetching navigation menu:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
