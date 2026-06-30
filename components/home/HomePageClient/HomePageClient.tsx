import FeaturedProductSection from "@/components/home/FeaturedProductSection";
import HeroSection from "@/components/home/HeroSection";
import NavigationList from "@/components/layout/Navigation/NavigationList";
import { HOME_PAGE_CONTENT_QUERYResult } from "@/sanity.types";
import type { NavigationItem } from "@/sanity/lib/getResolvedNavigation";

interface HomePageClientProps {
	homePageContent: HOME_PAGE_CONTENT_QUERYResult;
	navigationItems: NavigationItem[];
}

export default function HomePageClient({
	homePageContent,
	navigationItems,
}: HomePageClientProps) {
	const featuredProducts = homePageContent?.featuredProducts ?? [];
	return (
		<>
			<div className="mb-10 md:mb-24 xl:mb-30">
				<HeroSection />
			</div>
			<div className="main-container mb-30 flex flex-col gap-y-30">
				<section aria-label="Site Navigation">
					<div className="flex">
						<NavigationList
							menuType="content"
							navigationItems={navigationItems}
						/>
					</div>
				</section>
				{featuredProducts.length && (
					<FeaturedProductSection featuredProducts={featuredProducts} />
				)}
			</div>
		</>
	);
}
