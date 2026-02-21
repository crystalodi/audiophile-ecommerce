import { CategoryComponentProps } from "@/components/category/types";
import CategoryList from "@/components/category/CategoryList";

export default function CategoryPageContent({
	categoryName,
	products,
}: CategoryComponentProps) {
	return (
		<div className="main-container">
			<CategoryList categoryName={categoryName} products={products} />
		</div>
	);
}
