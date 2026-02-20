import { getNavigationMenu } from "@/sanity/lib/contentApi";
import Header from "./Header";
import NavigationMenu from "@/components/layout/Navigation/NavigationMenu";
import { urlFor } from "@/sanity/lib/image";

async function getNavigationList() {
	const navigationMenuData = await getNavigationMenu("mobile");
	return (
		navigationMenuData?.navigationItems?.map(item => ({
			title: item.title,
			href: item.href,
			image: urlFor(item.image?.asset as any).url(),
		})) ?? [
			{ title: "Home", href: "/" },
			{ title: "Headphones", href: "/headphones" },
			{ title: "Speakers", href: "/speakers" },
			{ title: "Earphones", href: "/earphones" },
		]
	);
}

export default async function HeaderWrapper() {
	const navigationItems = await getNavigationList();
	return (
		<Header navigationItems={navigationItems}>
			<NavigationMenu menuType="header" />
		</Header>
	);
}
