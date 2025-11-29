import ProductCard from "@/components/ProductCard";
import { getStaticPaths } from "@/lib/getStaticPaths";
import { getProductsByCategory } from "@/sanity/lib/api";
import { notFound } from "next/navigation";

async function CategoryPage({
	params,
}: {
	params: Promise<{ category: string }>;
}) {
	const { category } = await params;
	const isValidRoute = await getStaticPaths(category);
	if (!isValidRoute) return notFound();

	const products = await getProductsByCategory(category);

	return (
		<>
			<header className="bg-audiophile-black flex justify-center py-8 md:pt-[105px] md:pb-[97px] xl:pt-[98px] xl:pb-[97px]">
				<h1 className="heading-4 md:heading-2 text-white">{category}</h1>
			</header>
			<div className="main-container">
				<section
					className="mt-16 mb-30 flex flex-col items-center justify-center gap-y-30 md:mt-30 xl:mt-40"
					aria-label={`${category} products`}
				>
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
				</section>
			</div>
		</>
	);
}

export default CategoryPage;
