import { imageUrl } from "@/lib/imageUrl";
import { PRODUCT_BY_ID_QUERYResult } from "@/sanity.types";

interface ProductGalleryProps {
	productName: string;
	gallery: NonNullable<PRODUCT_BY_ID_QUERYResult>["gallery"];
}

export default function ProductGallery({
	productName,
	gallery: { first, second, third },
}: ProductGalleryProps) {
	return (
		<section aria-label={`${productName} image gallery`}>
			<div className="gallery-image-grid grid grid-cols-1 gap-y-5 md:grid-cols-(--product-gallery-grid-columns-md) md:gap-x-[18px] lg:gap-x-[30px] lg:gap-y-8">
				<picture className="flex flex-col md:[grid-area:one]">
					<source
						srcSet={imageUrl(first.desktop.asset).url()}
						media="(min-width: 1024px)"
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
						media="(min-width: 1024px)"
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
						media="(min-width: 1024px)"
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
	);
}
