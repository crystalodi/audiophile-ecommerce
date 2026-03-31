import { create } from "zustand";

export type CartItem = {
	_id: string;
	quantity: number;
	_key?: string;
};

interface CartStore {
	cartId: string;
	setCartId: (cartId: string) => void;
}

export const useCartStore = create<CartStore>()(set => ({
	cartId: "",
	setCartId: (cartId: string) => set({ cartId }),
}));
