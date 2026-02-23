import ProductCard from "@/components/product/ProductCard";
import { CategoryComponentProps } from "@/components/category/types";

export default function CategoryList({
	categoryName,
	products,
}: CategoryComponentProps) {
	return (
		<section aria-label={`${categoryName} products`}>
			<div className="flex flex-col items-center justify-center gap-y-30">
				{products.length > 0 ? (
					products.map(product => (
						<ProductCard
							product={product}
							key={product._id}
							variant="category"
						/>
					))
				) : (
					<p>No products found.</p>
				)}
			</div>
		</section>
	);
}
