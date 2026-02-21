import { PRODUCTS_BY_CATEGORY_QUERYResult } from "@/sanity.types";

export interface CategoryComponentProps {
	categoryName: string;
	products: NonNullable<PRODUCTS_BY_CATEGORY_QUERYResult>["products"];
}
