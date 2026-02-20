import { ALL_PRODUCT_PRICES_QUERYResult } from "@/sanity.types";
import { create } from "zustand";

export type ProductData = ALL_PRODUCT_PRICES_QUERYResult[0];

interface ProductStore {
	products: Map<string, any>;
	initializeProducts: (initialProducts: ProductData[]) => void;
	getProduct: (_id: string) => ProductData | undefined;
}

export const useProductStore = create<ProductStore>()((set, get) => ({
	products: new Map(),

	initializeProducts: (initialProducts: ProductData[]) => {
		const productsMap = new Map(
			initialProducts.map(product => [
				product._id,
				{
					...product,
				},
			])
		);
		set({ products: productsMap });
	},

	getProduct: (_id: string) => {
		return get().products.get(_id);
	},
}));
