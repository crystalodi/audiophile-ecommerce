import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
	slug: string;
	quantity: number;
};

interface CartStore {
	cartItems: Map<string, CartItem>;
	totalItems: number;
	hasHydrated: boolean;
	setHasHydrated: (state: boolean) => void;
	addCartItem: (item: CartItem) => void;
	deleteCartItem: (slug: string) => void;
	updateQuantity: (item: CartItem) => void;
	clearCart: () => void;
	timestamp: number;
}

const CART_TTL = 1000 * 60 * 60 * 24;

export const useCartStore = create<CartStore>()(
	persist(
		(set, get) => ({
			cartItems: new Map(),
			totalItems: 0, // Initialize as 0, not computed
			hasHydrated: false,
			timestamp: Date.now(),

			setHasHydrated: (state: boolean) => {
				set({ hasHydrated: state });
			},

			addCartItem: (item: CartItem) => {
				const { cartItems } = get();
				const existingItem = cartItems.get(item.slug);
				let newCartItems: Map<string, CartItem>;

				if (existingItem) {
					newCartItems = new Map(cartItems);
					newCartItems.set(item.slug, {
						...existingItem,
						quantity: existingItem.quantity + item.quantity,
					});
				} else {
					newCartItems = new Map(cartItems);
					newCartItems.set(item.slug, item);
				}

				// Calculate totalItems
				const totalItems = Array.from(newCartItems.values()).reduce(
					(sum, item) => sum + item.quantity,
					0
				);

				set({ cartItems: newCartItems, totalItems, timestamp: Date.now() });
			},

			deleteCartItem: (slug: string) => {
				set(state => {
					const newCartItems = new Map(state.cartItems);
					newCartItems.delete(slug);

					// Recalculate totalItems
					const totalItems = Array.from(newCartItems.values()).reduce(
						(sum, item) => sum + item.quantity,
						0
					);

					return { cartItems: newCartItems, totalItems, timestamp: Date.now() };
				});
			},

			updateQuantity: (item: CartItem) => {
				set(state => {
					const newCartItems = new Map(state.cartItems);
					const existingItem = newCartItems.get(item.slug);

					if (existingItem) {
						newCartItems.set(item.slug, {
							...existingItem,
							quantity: item.quantity,
						});
					}

					// Recalculate totalItems
					const totalItems = Array.from(newCartItems.values()).reduce(
						(sum, item) => sum + item.quantity,
						0
					);

					return { cartItems: newCartItems, totalItems, timestamp: Date.now() };
				});
			},

			clearCart: () => {
				set({ cartItems: new Map(), totalItems: 0, timestamp: Date.now() });
			},
		}),
		{
			name: "audiophile-cart-storage",
			onRehydrateStorage: () => state => {
				if (state) {
					if (Date.now() - (state.timestamp ?? 0) > CART_TTL) {
						state.totalItems = 0;
						state.cartItems = new Map([]);
						state.timestamp = Date.now();
						useCartStore.persist.clearStorage();
					}
					state.setHasHydrated(true);
				}
			},
			storage: {
				getItem: name => {
					const str = localStorage.getItem(name);
					if (!str) return null;

					const { state } = JSON.parse(str);
					const cartItems: Map<string, CartItem> = new Map(
						state.cartItems || []
					);

					// Recalculate totalItems on hydration
					const totalItems = Array.from(cartItems.values()).reduce(
						(sum, item) => sum + item.quantity,
						0
					);

					return {
						state: {
							...state,
							cartItems,
							totalItems,
						},
					};
				},
				setItem: (name, value) => {
					const cartItemsArray = Array.from(value.state.cartItems.entries());
					const toStore = {
						state: {
							...value.state,
							cartItems: cartItemsArray,
						},
					};
					localStorage.setItem(name, JSON.stringify(toStore));
				},
				removeItem: name => localStorage.removeItem(name),
			},
		}
	)
);
