import ProductCard from "@/components/product/ProductCard";
import { CategoryComponentProps } from "@/components/category/types";

export default function CategoryList({
	categoryName,
	products,
}: CategoryComponentProps) {
	return (
		<section
			className="mt-16 mb-30 flex flex-col items-center justify-center gap-y-30 md:mt-30 xl:mt-40"
			aria-label={`${categoryName} products`}
		>
			{products.length > 0 ? (
				products.map(product => (
					<ProductCard product={product} key={product._id} variant="category" />
				))
			) : (
				<p>No products found.</p>
			)}
		</section>
	);
}
