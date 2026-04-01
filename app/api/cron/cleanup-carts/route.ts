import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

export async function GET(request: Request) {
	const authHeader = request.headers.get("authorization");
	if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
		return new NextResponse("Unauthorized", { status: 401 });
	}

	try {
		const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

		const oldCarts: string[] = await writeClient.fetch(
			`*[_type == "cart" && _createdAt < $oneDayAgo && status === "active"]._id`,
			{ oneDayAgo }
		);

		if (oldCarts.length > 0) {
			const transaction = writeClient.transaction();
			oldCarts.forEach(id => {
				transaction.patch(id, { set: { status: "expired" } });
			});
			await transaction.commit();
		}

		return NextResponse.json({
			success: true,
			expired: oldCarts.length,
		});
	} catch (error) {
		console.error("Error expiring carts:", error);
		return NextResponse.json(
			{
				success: false,
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		);
	}
}
