import ProductCard from "@/components/product/ProductCard";
import ProductFeatureList from "@/components/product/ProductFeatureList";
import ProductGallery from "@/components/product/ProductGallery";
import ProductPageHeader from "@/components/product/ProductPageHeader";
import RelatedProductList from "@/components/product/RelatedProductList";
import { PRODUCT_BY_ID_QUERYResult } from "@/sanity.types";

interface ProductPageClientProps {
	detailProduct: NonNullable<PRODUCT_BY_ID_QUERYResult>;
}

export default function ProductPageClient({
	detailProduct,
}: ProductPageClientProps) {
	const {
		productName,
		features,
		includes,
		description,
		mediaImage,
		isNewProduct,
		gallery,
		category,
		stock,
		price,
		others,
		_id,
		slug,
	} = detailProduct;

	const product = {
		slug,
		productName,
		description,
		isNewProduct,
		category,
		stock,
		price,
		mediaImage,
		_id,
	};

	return (
		<div className="main-container">
			<div className="mt-4 flex flex-col md:mt-[33px] lg:mt-[79px]">
				<div className="mb-6 lg:mb-[52px]">
					<ProductPageHeader categoryName={category.categoryName} />
				</div>
				<div className="mb-22">
					<ProductCard product={product} variant="detail" />
				</div>
				<div className="mb-[121px] lg:mb-40">
					<ProductFeatureList
						productName={productName}
						includes={includes}
						features={features}
					/>
				</div>
				<div className="mb-30">
					<ProductGallery productName={productName} gallery={gallery} />
				</div>
				<div className="mb-30">
					<RelatedProductList others={others} productName={productName} />
				</div>
			</div>
		</div>
	);
}
