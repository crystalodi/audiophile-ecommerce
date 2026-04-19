import FeaturedProduct from "@/components/home/FeaturedProduct";
import { HOME_PAGE_CONTENT_QUERYResult } from "@/sanity.types";

type FeaturedProduct = NonNullable<
	NonNullable<HOME_PAGE_CONTENT_QUERYResult>["featuredProducts"]
>;
export default function FeaturedProductSection({
	featuredProducts,
}: {
	featuredProducts: FeaturedProduct;
}) {
	return (
		<section aria-label="Featured Products">
			<div className="flex flex-col gap-y-6">
				{featuredProducts.map(featuredProduct => (
					<FeaturedProduct
						{...featuredProduct}
						key={`featuredProduct-${featuredProduct.product.slug.current}`}
					/>
				))}
			</div>
		</section>
	);
}
