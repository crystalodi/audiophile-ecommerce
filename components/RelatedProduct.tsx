import { RelatedProductType } from "@/lib/custom.types";
import { imageUrl } from "@/lib/imageUrl";
import Link from "next/link";

export default function RelatedProduct(props: RelatedProductType) {
	const { productName, mediaImage, slug, category, shortName } = props;

	const productHref = `/${category.categoryName.toLowerCase()}/${slug.current}`;

	return (
		<article className="flex flex-col gap-y-10 md:flex-1">
			<div className="flex bg-audiophile-gray rounded-[8px] h-30 md:h-79.5 justify-center items-center overflow-hidden">
				<div className="transform scale-125 md:scale-150">
					<picture>
						<source
							srcSet={imageUrl(mediaImage.desktop.asset).url()}
							media="(min-width: 1280px)"
						/>
						<source
							srcSet={imageUrl(mediaImage.tablet.asset).url()}
							media="(min-width: 768px)"
						/>
						<img
							src={imageUrl(mediaImage.mobile.asset).url()}
							alt={productName}
							loading="lazy"
							className="min-h-[83px] max-h-[96px] md:min-h-[172px] md:max-h-[199px] object-cover object-center"
						/>
					</picture>
				</div>
			</div>
			<div className="flex flex-col justify-center items-center">
				<h3 className="text-black mb-8 heading-5">
					{shortName ? shortName : productName}
				</h3>
				<Link
					href={productHref}
					className="btn btn-orange"
					aria-label={`View details for related product ${productName}`}
				>
					see product
				</Link>
			</div>
		</article>
	);
}
