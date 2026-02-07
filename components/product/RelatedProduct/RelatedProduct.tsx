import { CustomImageType, Slug } from "@/sanity.types";
import { imageUrl } from "@/lib/imageUrl";
import Link from "next/link";

interface RelatedProductProps {
	_id: string;
	productName: string;
	shortName: string | null;
	mediaImage: CustomImageType;
	slug: Slug;
	category: {
		categoryName: string;
	};
}

export default function RelatedProduct(props: RelatedProductProps) {
	const { productName, mediaImage, slug, category, shortName } = props;

	const productHref = `/${category.categoryName.toLowerCase()}/${slug.current}`;

	return (
		<article className="flex flex-col gap-y-10 md:flex-1">
			<div className="bg-audiophile-gray flex h-30 items-center justify-center overflow-hidden rounded-[8px] md:h-79.5">
				<div className="scale-125 transform md:scale-150">
					<picture>
						<source
							srcSet={imageUrl(mediaImage.desktop.asset).url()}
							media="(min-width: 1024px)"
						/>
						<source
							srcSet={imageUrl(mediaImage.tablet.asset).url()}
							media="(min-width: 768px)"
						/>
						<img
							src={imageUrl(mediaImage.mobile.asset).url()}
							alt={productName}
							loading="lazy"
							className="max-h-[96px] min-h-[83px] object-cover object-center md:max-h-[199px] md:min-h-[172px]"
						/>
					</picture>
				</div>
			</div>
			<div className="flex flex-col items-center justify-center">
				<h3 className="heading-5 mb-8 text-black">
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
