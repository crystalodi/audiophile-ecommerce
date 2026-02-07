import React from "react";
import { cn } from "@/lib/utils";

interface ProductCardSkeletonProps {
	variant: "category" | "detail";
	showNewProduct?: boolean;
}

export default function ProductCardSkeleton({
	variant,
	showNewProduct = true,
}: ProductCardSkeletonProps) {
	const containerClasses = cn("flex flex-col", {
		"gap-y-8 md:gap-y-[52px] lg:gap-y-0 lg:gap-x-31.25 lg:flex-row lg:even:flex-row-reverse":
			variant === "category",
		"gap-y-8": variant === "detail" && showNewProduct,
		"gap-y-10": variant === "detail" && !showNewProduct,
		"md:flex-row md:gap-y-0 md:gap-x-[69px] lg:gap-x-[124.5px]":
			variant === "detail",
	});

	const pictureWrapperClasses = cn("flex flex-col", {
		"items-center justify-center lg:flex-1": variant === "category",
		"rounded-lg md:flex-1 md:w-2/5 lg:w-1/2": variant === "detail",
	});

	const pictureClasses = cn({
		"flex flex-col items-center justify-center lg:flex-1":
			variant === "category",
		"h-[327px] md:h-[480px] lg:h-[560px]": variant === "detail",
	});

	const imgSkeletonClasses = cn("rounded-lg animate-shimmer", {
		"w-full h-[327px] md:h-[352px] lg:h-[560px]": variant === "category",
		"w-full h-full md:object-cover": variant === "detail",
	});

	const contentWrapperClasses = cn("flex items-center justify-center", {
		"flex-row lg:flex-1": variant === "category",
		"flex-col justify-center flex-1": variant === "detail",
	});

	const contentClasses = cn("flex flex-col", {
		"items-center justify-center text-center md:max-w-[83%] lg:text-left lg:items-start lg:max-w-[initial]":
			variant === "category",
	});

	const newProductSkeletonClasses = cn("animate-shimmer h-5", {
		"mb-4 w-32": variant === "category",
		"mb-6 md:mb-[17px] w-32": variant === "detail",
	});

	const titleSkeletonClasses = cn("animate-shimmer md:mb-8 h-10 md:h-12", {
		"mb-4 w-3/4": variant === "category",
		"mb-6 w-4/5": variant === "detail",
	});

	const descriptionSkeletonClasses = cn("flex flex-col gap-2", {
		"mb-4 md:mb-6": variant === "category",
		"mb-6 md:mb-8": variant === "detail",
	});

	return (
		<div className={containerClasses}>
			<div className={pictureWrapperClasses}>
				<div className={pictureClasses}>
					<div className={imgSkeletonClasses}></div>
				</div>
			</div>

			<div className={contentWrapperClasses}>
				<div className={contentClasses}>
					{showNewProduct && <div className={newProductSkeletonClasses}></div>}

					<div className={titleSkeletonClasses}></div>

					<div className={descriptionSkeletonClasses}>
						<div className="animate-shimmer h-6 w-full"></div>
						<div className="animate-shimmer h-6 w-5/6"></div>
						<div className="animate-shimmer h-6 w-4/5"></div>
					</div>

					{variant === "category" && (
						<div className="animate-shimmer h-12 w-40"></div>
					)}

					{variant === "detail" && (
						<>
							<div className="animate-shimmer mb-[31px] h-8 w-32"></div>
							<div className="flex gap-4">
								<div className="animate-shimmer h-12 w-32"></div>
								<div className="animate-shimmer h-12 w-40"></div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
