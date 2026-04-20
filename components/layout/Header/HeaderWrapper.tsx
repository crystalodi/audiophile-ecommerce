import { getNavigationMenu } from "@/sanity/lib/contentApi";
import Header from "./Header";
import NavigationMenu from "@/components/layout/Navigation/NavigationMenu";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface HeaderWrapperProps {
	disableCartDialog?: boolean;
}

async function getNavigationList() {
	const navigationMenuData = await getNavigationMenu("mobile");
	return (
		navigationMenuData?.navigationItems?.map(item => ({
			title: item.title,
			href: item.href,
			image: urlFor(item.image?.asset as SanityImageSource).url(),
		})) ?? [
			{ title: "Home", href: "/" },
			{ title: "Headphones", href: "/headphones" },
			{ title: "Speakers", href: "/speakers" },
			{ title: "Earphones", href: "/earphones" },
		]
	);
}

export default async function HeaderWrapper({
	disableCartDialog = false,
}: HeaderWrapperProps) {
	const navigationItems = await getNavigationList();
	return (
		<Header
			navigationItems={navigationItems}
			disableCartDialog={disableCartDialog}
		>
			<NavigationMenu menuType="header" />
		</Header>
	);
}
