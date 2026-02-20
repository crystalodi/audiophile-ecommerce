import HeroSection from "@/components/home/HeroSection";
import { getHomePageContent } from "@/sanity/lib/contentApi";
import NavigationMenu from "@/components/layout/Navigation/NavigationMenu";
import FeaturedProductSection from "@/components/home/FeaturedProductSection";

export default async function Home() {
	const headerContent = await getHomePageContent();
	const featuredProducts = headerContent?.featuredProducts || [];
	return (
		<>
			<div className="mb-10 md:mb-24 xl:mb-30">
				<HeroSection />
			</div>
			<div className="main-container mb-30 flex flex-col gap-y-30">
				<section aria-label="Site Navigation">
					<div className="flex">
						<NavigationMenu menuType="content" />
					</div>
				</section>
				{featuredProducts.length && (
					<section aria-label="Featured Products">
						<FeaturedProductSection featuredProducts={featuredProducts} />
					</section>
				)}
			</div>
		</>
	);
}
