"use client";

import { create } from "zustand";
import { Cart, Product } from "@/sanity.types";

export interface CartData {
	_id: string;
	items: {
		product: {
			_id: string;
			productName: string;
			price: number;
			cartImage: Product["cartImage"];
		};
		quantity: number;
		reservedAt: string;
	}[];
	status: Cart["status"];
	_createdAt: string;
}

interface CartDataStore {
	cartData: CartData | null;
	totalItems: number;
	cartTotal: number;
	vatTotal: number;
	grandTotal: number;
	shippingFee: number;
	initializeCart: (cart: CartData) => void;
}

export const useCartDataStore = create<CartDataStore>()(set => ({
	cartData: null,
	totalItems: 0,
	cartTotal: 0,
	vatTotal: 0,
	grandTotal: 0,
	shippingFee: 0,
	initializeCart: (cart: CartData) => {
		const totalItems = cart.items.reduce(
			(previous, current) => previous + current.quantity,
			0
		);
		const cartTotal = cart.items.reduce(
			(previous, current) =>
				previous + current.quantity * current.product.price,
			0
		);
		const vatTotal = Math.floor(cartTotal * 0.2);
		const shippingFee = 50;
		const grandTotal = vatTotal + cartTotal + shippingFee;
		set({
			cartData: cart,
			totalItems,
			cartTotal,
			vatTotal,
			shippingFee,
			grandTotal,
		});
	},
}));
