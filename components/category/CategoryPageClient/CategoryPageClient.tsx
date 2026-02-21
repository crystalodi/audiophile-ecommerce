import CategoryHeader from "@/components/category/CategoryHeader";
import CategoryPageContent from "@/components/category/CategoryPageContent";
import { CategoryComponentProps } from "@/components/category/types";

export default function CategoryPageClient({
	categoryName,
	products,
}: CategoryComponentProps) {
	return (
		<>
			<CategoryHeader categoryName={categoryName} />
			<CategoryPageContent categoryName={categoryName} products={products} />
		</>
	);
}
