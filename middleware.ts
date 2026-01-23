import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const pathName = request.nextUrl.pathname;

	const categoryMatch = pathName.match(
		/^\/(headphones|speakers|earphones)(?:\/[^\/]+)?$/i
	);

	if (categoryMatch) {
		const category = categoryMatch[1];
		const categoryLower = category.toLowerCase();

		if (category !== categoryLower) {
			const newUrl = pathName.replace(`/${category}`, `/${categoryLower}`);
			return NextResponse.redirect(new URL(newUrl, request.url));
		}
	}

	const response = NextResponse.next();
	response.headers.set("x-pathname", pathName);
	return response;
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
