import { getHomePageContent } from "@/sanity/lib/contentApi";
import HomePageClient from "@/components/home/HomePageClient";
import { getResolvedNavigation } from "@/sanity/lib/getResolvedNavigation";

export default async function Home() {
	const [homePageContent, navigationItems] = await Promise.all([
		getHomePageContent(),
		getResolvedNavigation("content"),
	]);

	return (
		<HomePageClient
			homePageContent={homePageContent}
			navigationItems={navigationItems}
		/>
	);
}
