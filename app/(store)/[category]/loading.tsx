import ProductCardSkeleton from "@/components/ProductCardSkeleton";

export default function Loading() {
	return (
		<>
			<header className="bg-audiophile-black flex justify-center py-8 md:pt-[105px] md:pb-[97px] xl:pt-[98px] xl:pb-[97px]">
				<div className="animate-shimmer h-8 w-32 md:h-12 md:w-48"></div>
			</header>
			<div className="main-container">
				<section
					className="mt-16 mb-30 flex w-full flex-col items-center justify-center gap-y-30 md:mt-30 xl:mt-40"
					aria-label="Loading products"
				>
					{Array.from({ length: 3 }).map((_, index) => (
						<ProductCardSkeleton
							key={index}
							variant="category"
							showNewProduct={index % 2 === 0}
						/>
					))}
				</section>
			</div>
		</>
	);
}
