import {
	PRODUCT_BY_ID_QUERYResult,
	PRODUCTS_BY_CATEGORY_QUERYResult,
} from "@/sanity.types";

export type DetailProductType = Omit<
	NonNullable<PRODUCT_BY_ID_QUERYResult>,
	"_id" | "features" | "includes" | "gallery" | "others"
>;

export type RelatedProductType = Omit<
	NonNullable<NonNullable<PRODUCT_BY_ID_QUERYResult>["others"]>[0],
	"_id"
>;

export type CategoryProductType = Omit<
	PRODUCTS_BY_CATEGORY_QUERYResult[0],
	"_id"
>;
