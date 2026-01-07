import {
	PRODUCT_BY_ID_QUERYResult,
	PRODUCTS_BY_CATEGORY_QUERYResult,
	HOME_PAGE_CONTENT_QUERYResult,
} from "@/sanity.types";

export type DetailProductType = Omit<
	NonNullable<PRODUCT_BY_ID_QUERYResult>,
	"features" | "includes" | "gallery" | "others"
>;

export type RelatedProductType = NonNullable<
	NonNullable<PRODUCT_BY_ID_QUERYResult>["others"]
>[0];

export type CategoryProductType = PRODUCTS_BY_CATEGORY_QUERYResult[0];

export type FeaturedProductType = NonNullable<
	NonNullable<HOME_PAGE_CONTENT_QUERYResult>["featuredProducts"]
>[0];
