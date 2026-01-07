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
	initializeProducts: (products: ALL_PRODUCT_PRICES_QUERYResult) => void;
	getProduct: (_id: string) => ProductData | undefined;
}

export const useProductStore = create<ProductStore>()((set, get) => ({
	products: new Map(),

	initializeProducts: (products: ALL_PRODUCT_PRICES_QUERYResult) => {
		const productsMap = new Map(
			products.map(product => [
				product._id,
				{
					slug: product.slug,
					price: product.price,
					maxQuantity: product.maxQuantity,
					productName: product.productName,
					cartImage: imageUrl(product.cartImage.asset).url(),
					_id: product._id,
				},
			])
		);
		set({ products: productsMap });
	},

	getProduct: (_id: string) => {
		return get().products.get(_id);
	},
}));
