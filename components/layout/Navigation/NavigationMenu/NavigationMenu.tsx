import { urlFor } from "@/sanity/lib/image";
import { NavigationMenuProps } from "@/lib/custom.types";
import { getNavigationMenu } from "@/sanity/lib/api";
import NavigationLogo from "@/components/layout/Navigation/NavigationLogo";
import NavigationList from "@/components/layout/Navigation/NavigationList";

export default async function NavigationMenu({
	menuType,
	onNavigate,
}: NavigationMenuProps) {
	const navigationData = await getNavigationMenu(menuType);

	// Fallback navigation items
	const fallbackNavItems = [
		{ title: "Home", href: "/" },
		{ title: "Headphones", href: "/headphones" },
		{ title: "Speakers", href: "/speakers" },
		{ title: "Earphones", href: "/earphones" },
	];

	const showLogo =
		navigationData?.showLogo ??
		(menuType === "header" || menuType === "footer");

	const sanityNavItems =
		navigationData?.navigationItems?.map(navItem => {
			return {
				title: navItem.title,
				href: navItem.href,
				image: navItem.image ? urlFor(navItem?.image?.asset as any).url() : "",
			};
		}) ?? null;

	const navigationItems: Array<{
		title: string;
		href: string;
		image?: string;
	}> = sanityNavItems ?? fallbackNavItems;

	return (
		<>
			<NavigationLogo menuType={menuType} showLogo={showLogo} />
			<NavigationList
				menuType={menuType}
				navigationItems={navigationItems}
				onNavigate={onNavigate}
			/>
		</>
	);
}
