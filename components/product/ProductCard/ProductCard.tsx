import { imageUrl } from "@/lib/imageUrl";
import Link from "next/link";
import AddToCart from "@/components/cart/AddToCart";
import { cn } from "@/lib/utils";
import {
	PRODUCT_BY_ID_QUERYResult,
	PRODUCTS_BY_CATEGORY_QUERYResult,
} from "@/sanity.types";

type DetailProduct = Omit<
	NonNullable<PRODUCT_BY_ID_QUERYResult>,
	"features" | "includes" | "gallery" | "others"
>;

type CategoryProduct =
	NonNullable<PRODUCTS_BY_CATEGORY_QUERYResult>["products"][0];

interface ProductCardProps {
	variant: "category" | "detail";
	product: CategoryProduct | DetailProduct;
}

export default function ProductCard({ variant, product }: ProductCardProps) {
	const { slug, mediaImage, productName, isNewProduct, description, _id } =
		product;

	const hasCategory = "category" in product;
	const hasPrice = "price" in product;
	const hasStock = "stock" in product;

	const productHref = hasCategory
		? `/${product.category.categoryName.toLowerCase()}/${slug.current}`
		: "";

	const articleClasses = cn("flex flex-col", {
		"gap-y-8 md:gap-y-[52px] lg:gap-y-0 lg:gap-x-31.25 lg:flex-row lg:even:flex-row-reverse":
			variant === "category",
		"md:flex-row md:gap-y-0 md:gap-x-[69px] lg:gap-x-[124.5px]":
			variant === "detail",
		"gap-y-8": variant === "detail" && isNewProduct,
		"gap-y-10": variant === "detail" && !isNewProduct,
	});

	const pictureWrapperClasses = cn(
		"flex flex-col justify-center bg-audiophile-gray",
		{
			"items-center lg:flex-1": variant === "category",
			"rounded-lg md:flex-1 md:w-2/5 lg:w-1/2": variant === "detail",
		}
	);

	const pictureClasses = cn({
		"flex flex-col items-center justify-center lg:flex-1":
			variant === "category",
		"md:max-h-[481px] lg:max-h-[initial]": variant === "detail",
	});

	const imgClasses = cn("rounded-lg", {
		"": variant === "category",
		"h-full w-full md:object-cover": variant === "detail",
	});

	const contentWrapperClasses = cn("flex items-center justify-center", {
		"flex-row lg:flex-1": variant === "category",
		"flex-col justify-center flex-1": variant === "detail",
	});

	const contentClasses = cn("flex flex-col", {
		"items-center justify-center text-center md:max-w-[83%] lg:text-left lg:items-start lg:max-w-[initial]":
			variant === "category",
	});

	const newProductClasses = cn("overline-text text-audiophile-orange ", {
		"mb-4": variant === "category",
		"mb-6 md:mb-[17px]": variant === "detail",
	});

	const titleClasses = cn("md:mb-8", {
		"mb-4 heading-4 md:heading-2": variant === "category",
		"heading-4 mb-6 lg:heading-2": variant === "detail",
	});

	const descriptionClasses = cn("body-text opacity-50", {
		"text-black mb-4 md:mb-6": variant === "category",
		"mb-6 md:mb-8": variant === "detail",
	});

	return (
		<article className={articleClasses}>
			<div className={pictureWrapperClasses}>
				<picture className={pictureClasses}>
					<source
						srcSet={imageUrl(mediaImage.desktop.asset).url()}
						media="(min-width: 1024px)"
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
							<div className="mb-[31px] font-bold">
								{`$ ${(product as DetailProduct).price.toLocaleString("en-US")}`}
							</div>
							<div>
								<AddToCart
									stock={(product as DetailProduct).stock}
									productName={productName}
									_id={_id}
								/>
							</div>
						</>
					)}
				</div>
			</div>
		</article>
	);
}
