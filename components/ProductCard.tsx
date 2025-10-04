import React from "react";
import { imageUrl } from "@/lib/imageUrl";
import Link from "next/link";
import { clsx } from "clsx";
import { CategoryProductType, DetailProductType } from "@/lib/custom.types";
import AddToCart from "./AddToCart";

type ProductCardProps = {
	variant: "category" | "detail";
	product: CategoryProductType | DetailProductType;
};

export default function ProductCard({ variant, product }: ProductCardProps) {
	const { slug, mediaImage, productName, isNewProduct, description } = product;

	const hasCategory = "category" in product;
	const hasPrice = "price" in product;
	const hasStock = "stock" in product;

	const productHref = hasCategory
		? `/${product.category.categoryName.toLowerCase()}/${slug.current}`
		: "";

	const articleClasses = clsx("flex flex-col", {
		"gap-y-8 md:gap-y-[52px] xl:gap-y-0 xl:gap-x-31.25 xl:flex-row xl:even:flex-row-reverse":
			variant === "category",
		"gap-y-8": variant === "detail" && isNewProduct,
		"gap-y-10": variant === "detail" && !isNewProduct,
		"md:flex-row md:gap-y-0 md:gap-x-[69px] xl:gap-x-[124.5px]":
			variant === "detail",
	});

	const pictureWrapperClasses = clsx({
		"flex flex-col items-center justify-center xl:flex-1":
			variant === "category",
		"flex flex-col rounded-lg md:flex-1 md:w-2/5 xl:w-1/2":
			variant === "detail",
	});

	const pictureClasses = clsx({
		"flex flex-col items-center justify-center xl:flex-1":
			variant === "category",
		"md:max-h-[481px] xl:max-h-[initial]": variant === "detail",
	});

	const imgClasses = clsx("rounded-lg", {
		"": variant === "category",
		"h-full w-full md:object-cover": variant === "detail",
	});

	const contentWrapperClasses = clsx({
		"flex items-center justify-center xl:flex-1": variant === "category",
		"flex flex-col items-center justify-center flex-1": variant === "detail",
	});

	const contentClasses = clsx("flex flex-col", {
		"items-center justify-center text-center md:max-w-[83%] xl:text-left xl:items-start xl:max-w-[initial]":
			variant === "category",
	});

	const newProductClasses = clsx("overline-text text-audiophile-orange", {
		"mb-4": variant === "category",
		"mb-6 md:mb-[17px]": variant === "detail",
	});

	const titleClasses = clsx({
		"mb-4 md:mb-8 heading-4 md:heading-2": variant === "category",
		"heading-4 mb-6 md:mb-8 xl:heading-2": variant === "detail",
	});

	const descriptionClasses = clsx("body-text opacity-50", {
		"text-black mb-4 md:mb-6": variant === "category",
		"mb-6 md:mb-8": variant === "detail",
	});

	return (
		<article className={articleClasses}>
			<div className={pictureWrapperClasses}>
				<picture className={pictureClasses}>
					<source
						srcSet={imageUrl(mediaImage.desktop.asset).url()}
						media="(min-width: 1280px)"
					/>
					<source
						srcSet={imageUrl(mediaImage.tablet.asset).url()}
						media="(min-width: 768px)"
					/>
					<img
						src={imageUrl(mediaImage.mobile.asset).url()}
						alt={productName}
						className={imgClasses}
						loading="lazy"
					/>
				</picture>
			</div>

			<div className={contentWrapperClasses}>
				<div className={contentClasses}>
					{isNewProduct && <div className={newProductClasses}>new product</div>}

					{variant === "category" ? (
						<h2 className={titleClasses}>{productName}</h2>
					) : (
						<h1 className={titleClasses}>{productName}</h1>
					)}

					<p className={descriptionClasses}>{description}</p>

					{variant === "category" && (
						<Link
							href={productHref}
							className="btn btn-orange"
							aria-label={`View details for ${productName}`}
						>
							see product
						</Link>
					)}

					{variant === "detail" && hasPrice && hasStock && (
						<>
							<div className="font-bold mb-[31px]">
								{`$ ${(product as DetailProductType).price.toLocaleString("en-US")}`}
							</div>
							<div>
								<AddToCart
									stock={(product as DetailProductType).stock}
									slug={slug}
									productName={productName}
								/>
							</div>
						</>
					)}
				</div>
			</div>
		</article>
	);
}
