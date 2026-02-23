import FeaturedProductSection from "@/components/home/FeaturedProductSection";
import HeroSection from "@/components/home/HeroSection";
import NavigationMenu from "@/components/layout/Navigation/NavigationMenu";
import { HOME_PAGE_CONTENT_QUERYResult } from "@/sanity.types";

interface HomePageClientProps {
	homePageContent: HOME_PAGE_CONTENT_QUERYResult;
}

export default function HomePageClient({
	homePageContent,
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
						<NavigationMenu menuType="content" />
					</div>
				</section>
				{featuredProducts.length && (
					<FeaturedProductSection featuredProducts={featuredProducts} />
				)}
			</div>
		</>
	);
}
