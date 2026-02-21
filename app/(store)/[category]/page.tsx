import CategoryPageClient from "@/components/category/CategoryPageClient";
import { getProductsByCategory } from "@/sanity/lib/productApi";
import { notFound } from "next/navigation";

const VALID_CATEGORIES = ["headphones", "speakers", "earphones"];
export default async function CategoryPage({
	params,
}: {
	params: Promise<{ category: string }>;
}) {
	const { category } = await params;
	if (!VALID_CATEGORIES.includes(category.toLowerCase())) {
		notFound();
	}

	const categoryData = await getProductsByCategory(category);

	if (!categoryData) {
		notFound();
	}

	const { categoryName, products } = categoryData;

	return <CategoryPageClient categoryName={categoryName} products={products} />;
}
