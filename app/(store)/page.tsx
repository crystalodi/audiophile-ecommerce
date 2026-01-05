import HeroSection from "@/components/home/HeroSection";
import { getHomePageContent } from "@/sanity/lib/api";
import { FeaturedProductType } from "@/lib/custom.types";
import { cn } from "@/lib/utils";
import { imageUrl } from "@/lib/imageUrl";
import Link from "next/link";
import NavigationMenu from "@/components/layout/Navigation/NavigationMenu";

function FeaturedProduct({
	product,
	layoutType,
	backgroundType,
	heroSVGBackgroundImage,
	heroBitmapBackgroundImage,
	featuredProductImage,
	description,
}: FeaturedProductType) {
	const isHeroWithSVG = layoutType === "hero" && backgroundType === "svg";
	const isHeroWithBitmapImage =
		layoutType === "hero" && backgroundType === "bitmap";

	const ctaUrl = `/${product.category.categoryName.toLowerCase()}/${product.slug.current}`;
	const productName = product.shortName ?? product.productName;
	const ctaAriaLabel = `View Product Details for featured product ${productName}`;

	const renderHeroBitMapBackgroundImage = () => {
		return (
			<>
				<div className="absolute top-0 left-0 h-full w-full">
					{heroBitmapBackgroundImage && (
						<picture className="absolute inset-0 -z-1">
							<source
								srcSet={imageUrl(heroBitmapBackgroundImage.desktop.asset).url()}
								media="(min-width: 1024px)"
							/>
							<source
								srcSet={imageUrl(heroBitmapBackgroundImage.tablet.asset).url()}
								media="(min-width: 768px)"
							/>
							<img
								src={imageUrl(heroBitmapBackgroundImage.mobile.asset).url()}
								alt={product.productName}
								className="h-full w-full object-cover object-center"
								loading="lazy"
							/>
						</picture>
					)}
				</div>
				<div className="relative">
					<h4 className="heading-4 mb-8">{productName}</h4>
					<div>
						<Link
							href={ctaUrl}
							className="btn btn-transparent uppercase"
							aria-label={ctaAriaLabel}
						>
							see product
						</Link>
					</div>
				</div>
			</>
		);
	};

	const renderFeaturedProductGrid = () => {
		return (
			<>
				<div className="overflow-hidden rounded-lg">
					{featuredProductImage && (
						<picture className="block h-full">
							<source
								srcSet={imageUrl(featuredProductImage.desktop.asset).url()}
								media="(min-width: 1024px)"
							/>
							<source
								srcSet={imageUrl(featuredProductImage.tablet.asset).url()}
								media="(min-width: 768px)"
							/>
							<img
								src={imageUrl(featuredProductImage.mobile.asset).url()}
								alt={product.productName}
								className="h-full w-full object-cover"
								loading="lazy"
							/>
						</picture>
					)}
				</div>
				<div className="rounded-lg bg-[#f1f1f1] px-6 py-[41px] md:py-[101px] md:pr-[51px] md:pl-[41px] lg:pl-[95px]">
					<h4 className="heading-4 mb-8">{productName}</h4>
					<div>
						<Link
							href={ctaUrl}
							className="btn btn-transparent uppercase"
							aria-label={ctaAriaLabel}
						>
							see product
						</Link>
					</div>
				</div>
			</>
		);
	};

	const renderHeroSVGContent = () => {
		return (
			<div className="flex w-full flex-col items-center justify-center text-center lg:flex lg:flex-row lg:items-start lg:justify-center lg:gap-x-[138px]">
				{featuredProductImage && (
					<div className="mb-8 md:mb-16 lg:mb-0">
						<picture>
							<source
								srcSet={imageUrl(featuredProductImage.desktop.asset).url()}
								media="(min-width: 1024px)"
							/>
							<source
								srcSet={imageUrl(featuredProductImage.tablet.asset).url()}
								media="(min-width: 768px)"
							/>
							<img
								src={imageUrl(featuredProductImage.mobile.asset).url()}
								alt={product.productName}
								className="relative h-[207px] w-auto object-cover md:h-[237px] lg:top-4 lg:h-[493px]"
								loading="lazy"
							/>
						</picture>
					</div>
				)}
				<div className="flex flex-col items-center justify-center gap-6 md:max-w-[349px] lg:items-start lg:pt-10 lg:text-left">
					<h3 className="md:heading-1 max-w-45 text-[36px] leading-10 font-bold tracking-[1.29px] text-white uppercase md:max-w-[349px]">
						{productName}
					</h3>
					<p className="body-text text-white/75">{description}</p>
					<div>
						<Link
							className="btn btn-black"
							href={ctaUrl}
							aria-label={ctaAriaLabel}
						>
							see product
						</Link>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div
			className={cn("relative overflow-hidden rounded-lg", {
				"flex flex-col items-center justify-center bg-[#D87D4A] bg-cover [background-position:center_-125px] bg-no-repeat py-[55px] pr-6 pl-[23px] md:[background-position:center_-180px] md:pt-[55px] md:pb-16 lg:items-start lg:justify-start lg:pt-[67px] lg:pb-0":
					isHeroWithSVG && !isHeroWithBitmapImage,
				"flex h-80 items-center pl-6 md:pl-[62px] lg:pl-[95px]":
					isHeroWithBitmapImage && !isHeroWithSVG,
				"grid h-106 grid-rows-2 gap-6 md:h-80 md:grid-cols-2 md:grid-rows-1 md:gap-[11px] lg:gap-[30px]":
					layoutType === "grid",
			})}
			style={{
				...(isHeroWithSVG &&
					heroSVGBackgroundImage && {
						backgroundImage: `url(${heroSVGBackgroundImage})`,
					}),
			}}
		>
			{isHeroWithBitmapImage &&
				heroBitmapBackgroundImage &&
				renderHeroBitMapBackgroundImage()}
			{layoutType === "grid" && renderFeaturedProductGrid()}
			{layoutType === "hero" &&
				heroSVGBackgroundImage &&
				renderHeroSVGContent()}
		</div>
	);
}

export default async function Home() {
	const headerContent = await getHomePageContent();
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
				<section aria-label="Featured Products">
					<div className="flex flex-col gap-y-6">
						{headerContent?.featuredProducts?.map((featuredProduct, index) =>
							featuredProduct ? (
								<FeaturedProduct
									{...featuredProduct}
									key={`featuredProduct-${index}`}
								/>
							) : null
						)}
					</div>
				</section>
			</div>
		</>
	);
}
