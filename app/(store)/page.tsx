import HeroSection from "@/components/HeroSection";
import LogoNavMenu from "@/components/LogoNavMenu";
import { getHomePageContent } from "@/sanity/lib/api";
import { FeaturedProductType } from "@/lib/custom.types";
import { cn } from "@/lib/utils";
import { imageUrl } from "@/lib/imageUrl";
import Link from "next/link";

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
				<div className="absolute top-0 left-0 w-full h-full">
					{heroBitmapBackgroundImage && (
						<picture className="inset-0 absolute -z-1">
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
								className="w-full h-full object-cover object-center"
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
				<div className="rounded-lg overflow-hidden">
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
								className="w-full h-full object-cover"
								loading="lazy"
							/>
						</picture>
					)}
				</div>
				<div className="bg-[#f1f1f1] rounded-lg py-[41px] px-6 md:py-[101px] md:pl-[41px] md:pr-[51px] lg:pl-[95px]">
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
			<div className="flex flex-col text-center items-center justify-center lg:flex lg:flex-row lg:items-start lg:justify-center lg:gap-x-[138px] w-full">
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
								className="w-auto h-[207px] object-cover md:h-[237px] lg:h-[493px] relative lg:top-4"
								loading="lazy"
							/>
						</picture>
					</div>
				)}
				<div className="flex flex-col gap-6 items-center justify-center md:max-w-[349px]  lg:text-left lg:items-start lg:pt-10">
					<h3 className="font-bold text-[36px] text-white leading-10 tracking-[1.29px] uppercase max-w-45 md:max-w-[349px] md:heading-1">
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
			className={cn("rounded-lg relative overflow-hidden", {
				"bg-[#D87D4A] flex flex-col bg-cover bg-no-repeat [background-position:center_-125px] md:[background-position:center_-180px] py-[55px] pl-[23px] pr-6 items-center justify-center md:pt-[55px] md:pb-16 lg:pb-0 lg:items-start lg:justify-start lg:pt-[67px]":
					isHeroWithSVG && !isHeroWithBitmapImage,
				"h-80 flex items-center pl-6 md:pl-[62px] lg:pl-[95px]":
					isHeroWithBitmapImage && !isHeroWithSVG,
				"h-106 md:h-80 grid grid-rows-2 gap-6 md:grid-rows-1 md:grid-cols-2 md:gap-[11px] lg:gap-[30px]":
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
						<LogoNavMenu menuType="content" />
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
