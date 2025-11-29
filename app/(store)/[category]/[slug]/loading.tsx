import ProductCardSkeleton from "@/components/ProductCardSkeleton";

export default function Loading() {
	return (
		<div className="main-container">
			<div className="mt-4 flex flex-col md:mt-[33px] xl:mt-[79px]">
				<div className="mb-6 xl:mb-[52px]">
					<div className="animate-shimmer h-6 w-20"></div>
				</div>
				<section aria-label="Loading product details" className="mb-22">
					<ProductCardSkeleton variant="detail" showNewProduct={true} />
				</section>
				<section
					aria-label="Loading product features"
					className="mb-[121px] xl:mb-40"
				>
					<div className="flex flex-col xl:flex-row xl:gap-x-[125px]">
						<div className="mb-22 flex flex-col md:mb-30 xl:mb-0 xl:flex-1/3">
							<div className="animate-shimmer mb-6 h-8 w-24 md:mb-8"></div>
							<div className="flex flex-col gap-y-3">
								<div className="animate-shimmer h-6 w-full"></div>
								<div className="animate-shimmer h-6 w-5/6"></div>
								<div className="animate-shimmer h-6 w-4/5"></div>
								<div className="animate-shimmer h-6 w-full"></div>
								<div className="animate-shimmer h-6 w-3/4"></div>
							</div>
						</div>
						<div className="flex w-full flex-col md:flex-row md:gap-x-[11px] xl:flex-1 xl:flex-col">
							<div className="mb-6 h-8 w-32 md:flex-1 xl:flex-[initial]">
								<div className="animate-shimmer h-full w-3/4"></div>
							</div>
							<div className="flex flex-col gap-y-2 md:flex-1 xl:flex-[initial]">
								{Array.from({ length: 4 }).map((_, index) => (
									<div key={index} className="flex gap-x-[21px]">
										<div className="animate-shimmer h-6 w-[18px]"></div>
										<div className="animate-shimmer h-6 w-24"></div>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>
				<section aria-label="Loading product gallery" className="mb-30">
					<div className="gallery-image-grid grid grid-cols-1 gap-y-5 md:grid-cols-(--product-gallery-grid-columns-md) md:gap-x-[18px] xl:gap-x-[30px] xl:gap-y-8">
						<div className="animate-shimmer h-[174px] rounded-lg md:h-[174px] md:[grid-area:one] xl:h-[280px]"></div>
						<div className="animate-shimmer h-[174px] rounded-lg md:h-[174px] md:[grid-area:two] xl:h-[280px]"></div>
						<div className="animate-shimmer h-[368px] rounded-lg md:h-[368px] md:[grid-area:three] xl:h-[592px]"></div>
					</div>
				</section>
				<section aria-label="Loading related products" className="mb-30">
					<div className="w-full text-center">
						<div className="animate-shimmer mx-auto mb-10 h-8 w-48 md:mb-13 xl:mb-16"></div>
						<div className="flex flex-col gap-y-14 md:flex-row md:gap-x-[11px] xl:gap-x-[30px]">
							{Array.from({ length: 3 }).map((_, index) => (
								<div
									key={index}
									className="flex flex-col items-center md:flex-1"
								>
									<div className="animate-shimmer mb-8 h-[120px] w-full rounded-lg md:mb-10 md:h-[318px]"></div>
									<div className="animate-shimmer mb-8 h-8 w-32"></div>
									<div className="animate-shimmer h-12 w-40"></div>
								</div>
							))}
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
