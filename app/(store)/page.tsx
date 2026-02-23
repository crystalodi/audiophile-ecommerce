import { getHomePageContent } from "@/sanity/lib/contentApi";
import HomePageClient from "@/components/home/HomePageClient";

export default async function Home() {
	const homePageContent = await getHomePageContent();
	return <HomePageClient homePageContent={homePageContent} />;
}
