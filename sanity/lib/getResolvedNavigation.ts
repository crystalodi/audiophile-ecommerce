import { getNavigationMenu } from "@/sanity/lib/contentApi";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type NavigationItem = {
	title: string;
	href: string;
	image?: string;
};

export async function getResolvedNavigation(
	menuType: "header" | "footer" | "mobile" | "content"
): Promise<NavigationItem[]> {
	const navigationData = await getNavigationMenu(menuType);

	const fallbackNavItems: NavigationItem[] = [
		{ title: "Home", href: "/" },
		{ title: "Headphones", href: "/headphones" },
		{ title: "Speakers", href: "/speakers" },
		{ title: "Earphones", href: "/earphones" },
	];

	return (
		navigationData?.navigationItems?.map(item => ({
			title: item.title,
			href: item.href,
			image: item.image
				? urlFor(item.image.asset as SanityImageSource).url()
				: "",
		})) ?? fallbackNavItems
	);
}
