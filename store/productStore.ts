import { ALL_PRODUCT_PRICES_QUERYResult } from "@/sanity.types";
import { create } from "zustand";

interface ProductStore {
	prices: Map<string, number>;
	initializePrices: (prices: ALL_PRODUCT_PRICES_QUERYResult) => void;
	getPrice: (slug: string) => number | undefined;
}

const useProductStore = create<ProductStore>()((set, get) => ({
	prices: new Map(),

	initializePrices: (prices: ALL_PRODUCT_PRICES_QUERYResult) => {
		const pricesMap = new Map(
			prices.map(product => [product.slug, product.price])
		);
		set({ prices: pricesMap });
	},

	getPrice: (slug: string) => {
		return get().prices.get(slug);
	},
}));

export { useProductStore };
