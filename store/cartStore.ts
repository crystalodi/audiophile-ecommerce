import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
	deleteCart,
	removeItemFromCart,
	updateCartItemQuantity,
	addItemToCart,
	createCart,
} from "@/sanity/lib/cartApi";

export type CartItem = {
	_id: string;
	quantity: number;
};

interface CartStore {
	cartId: string;
	hasHydrated: boolean;
	timestamp: number;
	setHasHydrated: (state: boolean) => void;
	setCartId: (cartId: string) => void;
	addCartItem: (item: CartItem) => Promise<void>;
	updateQuantity: (item: CartItem) => Promise<void>;
	deleteCartItem: (productId: string) => Promise<void>;
	clearCart: () => Promise<void>;
}

const CART_TTL = 24 * 60 * 60 * 1000; // 24 hours

export const useCartStore = create<CartStore>()(
	persist(
		(set, get) => ({
			cartId: "",
			hasHydrated: false,
			timestamp: Date.now(),

			setHasHydrated: (state: boolean) => {
				set({ hasHydrated: state });
			},

			setCartId: (cartId: string) => {
				set({ cartId, timestamp: Date.now() });
			},

			addCartItem: async (item: CartItem) => {
				const { cartId } = get();

				if (!cartId) {
					const newCart = await createCart([item]);
					set({ cartId: newCart._id, timestamp: Date.now() });
				} else {
					await addItemToCart(cartId, item);
				}
			},

			updateQuantity: async (item: CartItem) => {
				const { cartId } = get();
				if (cartId) {
					await updateCartItemQuantity(cartId, item);
				}
			},

			deleteCartItem: async (productId: string) => {
				const { cartId } = get();
				if (cartId) {
					await removeItemFromCart(cartId, productId);
				}
			},

			clearCart: async () => {
				const { cartId } = get();
				if (cartId) {
					await deleteCart(cartId);
				}
				set({ cartId: "", timestamp: Date.now() });
			},
		}),
		{
			name: "audiophile-cart-storage",
			onRehydrateStorage: () => state => {
				if (state) {
					// Check if cart has expired
					if (Date.now() - (state.timestamp ?? 0) > CART_TTL) {
						const cartId = state.cartId;
						state.cartId = "";
						// cartId && deleteCart(cartId);
					}
					state.setHasHydrated(true);
				}
			},
		}
	)
);
