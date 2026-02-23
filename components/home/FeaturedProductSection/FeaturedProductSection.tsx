import { FeaturedProductType } from "@/lib/custom.types";
import FeaturedProduct from "@/components/home/FeaturedProduct";

export default function FeaturedProductSection({
	featuredProducts,
}: {
	featuredProducts: Array<FeaturedProductType>;
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
