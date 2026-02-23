import { CategoryComponentProps } from "@/components/category/types";
import CategoryList from "@/components/category/CategoryList";

export default function CategoryPageContent({
	categoryName,
	products,
}: CategoryComponentProps) {
	return (
		<div className="main-container mt-16 mb-30 md:mt-30 lg:mt-40">
			<CategoryList categoryName={categoryName} products={products} />
		</div>
	);
}
