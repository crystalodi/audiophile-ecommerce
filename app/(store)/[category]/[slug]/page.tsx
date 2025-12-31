import { getProductDetail } from "@/sanity/lib/api";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import { imageUrl } from "@/lib/imageUrl";
import RelatedProduct from "@/components/product/RelatedProduct";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";

export default async function ProductPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const detailProduct = await getProductDetail(slug);
	if (!detailProduct) return notFound();

	const {
		productName,
		features,
		includes,
		description,
		mediaImage,
		isNewProduct,
		gallery: { first, second, third },
		category,
		stock,
		price,
		others,
		...restProps
	} = detailProduct;

	const product = {
		slug: restProps.slug,
		productName,
		description,
		isNewProduct,
		category,
		stock,
		price,
		mediaImage,
	};

	return (
		<div className="main-container">
			<div className="mt-4 flex flex-col md:mt-[33px] xl:mt-[79px]">
				<div className="mb-6 xl:mb-[52px]">
					<Link
						href={`/${category.categoryName}`}
						className="body-text opacity-50"
					>
						Go Back
					</Link>
				</div>
				<section aria-label={`Add ${productName} to cart`} className="mb-22">
					<ProductCard product={product} variant="detail" />
				</section>
				<section
					aria-label={`${productName} features and includes`}
					className="mb-[121px] xl:mb-40"
				>
					<div className="flex flex-col xl:flex-row xl:gap-x-[125px]">
						<div className="mb-22 flex flex-col md:mb-30 xl:mb-0 xl:flex-1/3">
							<h2 className="heading-5 md:heading-3 mb-6 md:mb-8">Features</h2>
							<div className="prose body-text max-w-none opacity-50">
								{Array.isArray(features) && <PortableText value={features} />}
							</div>
						</div>
						<div className="flex w-full flex-col md:flex-row md:gap-x-[11px] xl:flex-1 xl:flex-col">
							<h2 className="heading-5 md:heading-3 mb-6 md:flex-1 xl:flex-[initial]">
								in the box
							</h2>
							<ul className="body-text flex list-none flex-col gap-y-2 capitalize md:flex-1 xl:flex-[initial]">
								{includes?.map(item => (
									<li key={item._key} className="flex gap-x-[21px]">
										<div className="text-audiophile-orange basis-[18px] font-bold">
											{item.quantity}x
										</div>
										<div className="opacity-50">{item.item}</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				</section>
				<section aria-label={`${productName} image gallery`} className="mb-30">
					<div className="gallery-image-grid grid grid-cols-1 gap-y-5 md:grid-cols-(--product-gallery-grid-columns-md) md:gap-x-[18px] xl:gap-x-[30px] xl:gap-y-8">
						<picture className="flex flex-col md:[grid-area:one]">
							<source
								srcSet={imageUrl(first.desktop.asset).url()}
								media="(min-width: 1280px)"
							/>
							<source
								srcSet={imageUrl(first.tablet.asset).url()}
								media="(min-width: 768px)"
							/>
							<img
								src={imageUrl(first.mobile.asset).url()}
								alt={productName}
								className="h-full rounded-lg"
								loading="lazy"
							/>
						</picture>
						<picture className="flex flex-col md:[grid-area:two]">
							<source
								srcSet={imageUrl(second.desktop.asset).url()}
								media="(min-width: 1280px)"
							/>
							<source
								srcSet={imageUrl(second.tablet.asset).url()}
								media="(min-width: 768px)"
							/>
							<img
								src={imageUrl(second.mobile.asset).url()}
								alt={productName}
								className="h-full rounded-lg"
								loading="lazy"
							/>
						</picture>
						<picture className="flex flex-col md:[grid-area:three]">
							<source
								srcSet={imageUrl(third.desktop.asset).url()}
								media="(min-width: 1280px)"
							/>
							<source
								srcSet={imageUrl(third.tablet.asset).url()}
								media="(min-width: 768px)"
							/>
							<img
								src={imageUrl(third.mobile.asset).url()}
								alt={productName}
								className="h-full rounded-lg"
								loading="lazy"
							/>
						</picture>
					</div>
				</section>
				<section aria-label="Related Products" className="mb-30">
					<div className="w-full text-center">
						<h2 className="heading-5 md:heading-3 mb-10 md:mb-13 xl:mb-16">
							you may also like
						</h2>
						<ul className="flex list-none flex-col gap-y-14 md:flex-row md:gap-x-[11px] xl:gap-x-[30px]">
							{others?.map(other => (
								<li key={other.slug.current} className="flex-1">
									<RelatedProduct {...other} />
								</li>
							))}
						</ul>
					</div>
				</section>
			</div>
		</div>
	);
}
