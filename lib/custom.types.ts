import {
	PRODUCT_BY_ID_QUERYResult,
	PRODUCTS_BY_CATEGORY_QUERYResult,
	HOME_PAGE_CONTENT_QUERYResult,
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

export type FeaturedProductType = NonNullable<
	NonNullable<HOME_PAGE_CONTENT_QUERYResult>["featuredProducts"]
>[0];

export type LogoNavMenuProps = {
	menuType: "header" | "footer" | "mobile" | "content";
	onNavigate?: () => void;
};
