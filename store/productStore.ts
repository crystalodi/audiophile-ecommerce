import { ALL_PRODUCT_PRICES_QUERYResult } from "@/sanity.types";
import { create } from "zustand";
import { imageUrl } from "@/lib/imageUrl";

export type ProductData = Omit<
	ALL_PRODUCT_PRICES_QUERYResult[0],
	"cartImage"
> & {
	cartImage: string;
};

interface ProductStore {
	products: Map<string, ProductData>;
	initializeProducts: (prices: ALL_PRODUCT_PRICES_QUERYResult) => void;
	getProduct: (slug: string) => ProductData | undefined;
}

export const useProductStore = create<ProductStore>()((set, get) => ({
	products: new Map(),

	initializeProducts: (prices: ALL_PRODUCT_PRICES_QUERYResult) => {
		const productsMap = new Map(
			prices.map(product => [
				product.slug,
				{
					slug: product.slug,
					price: product.price,
					maxQuantity: product.maxQuantity,
					productName: product.productName,
					cartImage: imageUrl(product.cartImage.asset).url(),
				},
			])
		);
		set({ products: productsMap });
	},

	getProduct: (slug: string) => {
		return get().products.get(slug);
	},
}));
