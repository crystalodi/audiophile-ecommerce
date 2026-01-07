import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
	_id: string;
	quantity: number;
};

interface CartStore {
	cartItems: Map<string, CartItem>;
	totalItems: number;
	hasHydrated: boolean;
	setHasHydrated: (state: boolean) => void;
	addCartItem: (item: CartItem) => void;
	deleteCartItem: (_id: string) => void;
	updateQuantity: (item: CartItem) => void;
	clearCart: () => void;
	timestamp: number;
}

const CART_TTL = 1000 * 60 * 60 * 24;

export const useCartStore = create<CartStore>()(
	persist(
		(set, get) => ({
			cartItems: new Map(),
			totalItems: 0,
			hasHydrated: false,
			timestamp: Date.now(),

			setHasHydrated: (state: boolean) => {
				set({ hasHydrated: state });
			},

			addCartItem: (item: CartItem) => {
				const { cartItems } = get();
				const existingItem = cartItems.get(item._id);
				let newCartItems: Map<string, CartItem>;

				if (existingItem) {
					newCartItems = new Map(cartItems);
					newCartItems.set(item._id, {
						...existingItem,
						quantity: existingItem.quantity + item.quantity,
					});
				} else {
					newCartItems = new Map(cartItems);
					newCartItems.set(item._id, item);
				}

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
					const existingItem = newCartItems.get(item._id);

					if (existingItem) {
						newCartItems.set(item._id, {
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
					state.setHasHydrated(true);
				}
			},
			storage: {
				getItem: name => {
					const str = localStorage.getItem(name);
					if (!str) return null;

					const { state } = JSON.parse(str);

					if (Date.now() - (state.timestamp ?? 0) > CART_TTL) {
						localStorage.removeItem(name);
						return null;
					}

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
