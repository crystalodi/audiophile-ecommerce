import { PRODUCT_BY_ID_QUERYResult } from "@/sanity.types";
import RelatedProduct from "@/components/product/RelatedProduct";

interface RelatedProductListProps {
	productName: string;
	others: NonNullable<PRODUCT_BY_ID_QUERYResult>["others"];
}

export default function RelatedProductList({
	productName,
	others,
}: RelatedProductListProps) {
	return (
		<section aria-label={`Products related to ${productName}`}>
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
	);
}
