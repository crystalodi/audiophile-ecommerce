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
			className="bg-audiophile-black relative z-0 flex h-127.5 items-center justify-center overflow-hidden md:h-160 xl:justify-start"
			aria-labelledby="hero-heading"
		>
			<div className="absolute top-0 left-0 h-[600px] w-screen -translate-y-[89px] md:h-[729px]">
				<picture className="absolute inset-0 -z-20">
					<source srcSet={desktopImage} media="(min-width: 1280px)" />
					<source srcSet={tabletImage} media="(min-width: 768px)" />
					<img
						src={mobileImage}
						alt={`${productName} headphones product image`}
						className="h-full w-full object-contain object-center mix-blend-hard-light"
					/>
				</picture>
			</div>
			<div className="z-1 flex justify-center pr-6 pl-[23px] md:p-0 xl:justify-start xl:pl-[165px]">
				<div className="flex max-w-82 flex-col items-center justify-center text-center md:max-w-[379px] xl:items-start xl:justify-start xl:text-left">
					{isNewProduct && (
						<p
							className="mb-[10px] text-[14px] font-normal tracking-[10px] text-white/49 uppercase md:mb-6"
							aria-label="New product announcement"
						>
							new product
						</p>
					)}
					<h1
						id="hero-heading"
						className="mb-6 text-[36px] leading-10 font-bold tracking-[1.29px] text-white uppercase md:mb-6 md:text-[56px] md:leading-[58px] md:tracking-[2px]"
					>
						{productName}
					</h1>
					<p className="body-text mb-7 text-white/75 md:mb-10 md:max-w-[349px]">
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
