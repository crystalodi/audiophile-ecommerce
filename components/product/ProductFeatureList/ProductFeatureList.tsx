import { PRODUCT_BY_ID_QUERYResult } from "@/sanity.types";
import { PortableText } from "next-sanity";

interface ProductFeatureListProps {
	productName: string;
	features: NonNullable<PRODUCT_BY_ID_QUERYResult>["features"];
	includes: NonNullable<PRODUCT_BY_ID_QUERYResult>["includes"];
}

export default function ProductFeatureList({
	productName,
	features,
	includes,
}: ProductFeatureListProps) {
	return (
		<section aria-label={`${productName} features and includes`}>
			<div className="flex flex-col lg:flex-row lg:gap-x-[125px]">
				<div className="mb-22 flex flex-col md:mb-30 lg:mb-0 lg:flex-1/3">
					<h2 className="heading-5 md:heading-3 mb-6 md:mb-8">Features</h2>
					<div className="prose body-text max-w-none opacity-50">
						{Array.isArray(features) && <PortableText value={features} />}
					</div>
				</div>
				<div className="flex w-full flex-col md:flex-row md:gap-x-[11px] lg:flex-1 lg:flex-col">
					<h2 className="heading-5 md:heading-3 mb-6 md:flex-1 lg:flex-[initial]">
						in the box
					</h2>
					<ul className="body-text flex list-none flex-col gap-y-2 capitalize md:flex-1 lg:flex-[initial]">
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
	);
}
