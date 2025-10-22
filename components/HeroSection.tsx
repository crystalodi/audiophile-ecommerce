import { imageUrl } from "@/lib/imageUrl";
import { getHeroContent } from "@/sanity/lib/api";
import Link from "next/link";

export default async function HeroSection() {
	const heroContent = await getHeroContent();

	const { heroBackgroundImage, featuredProduct, featuredProductDescription } =
		heroContent || {};

	const { productName, isNewProduct, category, slug } = featuredProduct || {};

	const { mobile, tablet, desktop } = heroBackgroundImage || {};

	const mobileImage = mobile?.asset
		? imageUrl(mobile.asset).url()
		: "/images/home/mobile/image-header.jpg";
	const tabletImage = tablet?.asset
		? imageUrl(tablet.asset).url()
		: "/images/home/tablet/image-header.jpg";
	const desktopImage = desktop?.asset
		? imageUrl(desktop.asset).url()
		: "/images/home/desktop/image-header.jpg";

	const featuredProductHref = `/${category?.categoryName?.toLowerCase()}/${slug?.current}`;

	return (
		<section
			className="relative z-0 h-127.5 md:h-160 overflow-hidden bg-audiophile-black flex items-center justify-center xl:justify-start"
			aria-labelledby="hero-heading"
		>
			<div className="absolute w-screen h-[600px] md:h-[729px] top-0 left-0 -translate-y-[89px]">
				<picture className="absolute inset-0 -z-20">
					<source srcSet={desktopImage} media="(min-width: 1280px)" />
					<source srcSet={tabletImage} media="(min-width: 768px)" />
					<img
						src={mobileImage}
						alt={`${productName} headphones product image`}
						className="w-full h-full object-contain object-center mix-blend-hard-light"
					/>
				</picture>
			</div>
			<div className="pl-[23px] pr-6 flex justify-center z-1 md:p-0 xl:justify-start xl:pl-[165px]">
				<div className="flex flex-col justify-center items-center text-center max-w-82 md:max-w-[379px] xl:justify-start xl:items-start xl:text-left">
					{isNewProduct && (
						<p
							className="text-white/49 text-[14px] font-normal uppercase tracking-[10px] mb-[10px] md:mb-6"
							aria-label="New product announcement"
						>
							new product
						</p>
					)}
					<h1
						id="hero-heading"
						className="text-[36px] font-bold text-white tracking-[1.29px] leading-10 uppercase mb-6 md:text-[56px] md:tracking-[2px] md:leading-[58px] md:mb-6"
					>
						{productName}
					</h1>
					<p className="body-text text-white/75 mb-7 md:max-w-[349px] md:mb-10">
						{featuredProductDescription}
					</p>
					<Link
						href={featuredProductHref}
						className="btn btn-orange"
						aria-describedby="hero-heading"
					>
						see product
					</Link>
				</div>
			</div>
		</section>
	);
}
