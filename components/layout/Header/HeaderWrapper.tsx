import Header from "./Header";
import { getResolvedNavigation } from "@/sanity/lib/getResolvedNavigation";

interface HeaderWrapperProps {
	disableCartDialog?: boolean;
}

export default async function HeaderWrapper({
	disableCartDialog = false,
}: HeaderWrapperProps) {
	const [mobileNavigationItems, headerNavigationItems] = await Promise.all([
		getResolvedNavigation("mobile"),
		getResolvedNavigation("header"),
	]);

	return (
		<Header
			mobileNavigationItems={mobileNavigationItems}
			headerNavigationItems={headerNavigationItems}
			disableCartDialog={disableCartDialog}
		/>
	);
}
