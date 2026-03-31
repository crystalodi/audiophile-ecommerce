"use client";

import { create } from "zustand";
import { CART_BY_ID_QUERYResult } from "@/sanity.types";

export interface CartData {
	_id: string;
	items: Array<{
		product: {
			_id: string;
			productName: string;
			price: number;
			cartImage: {
				asset: {
					_ref: string;
					_type: "reference";
				};
				_type: "image";
			};
		};
		quantity: number;
		reservedAt: string;
		_key: string;
	}>;
	status: "active" | "converted_to_order" | "expired";
	_createdAt: string;
}

export interface CartProductItem {
	quantity: number;
	_id: string;
	productName: string;
	cartImage: string;
	price: number;
	_key: string;
}

interface CartDataStore {
	cartData: CartData | null;
	totalItems: number;
	cartTotal: number;
	vatTotal: number;
	grandTotal: number;
	shippingFee: number;
	initializeCart: (cart: CART_BY_ID_QUERYResult) => void;
	clearCart: () => void;
}

function isValidCartData(cart: CART_BY_ID_QUERYResult): cart is CartData {
	if (!cart || !cart.items || !cart.status || !cart._createdAt || !cart._id)
		return false;
	return cart.items.every(
		item =>
			item.product !== null &&
			item.quantity !== null &&
			item.reservedAt !== null &&
			item._key !== null
	);
}

export const useCartDataStore = create<CartDataStore>()(set => ({
	cartData: null,
	totalItems: 0,
	cartTotal: 0,
	vatTotal: 0,
	grandTotal: 0,
	shippingFee: 0,
	initializeCart: (cart: CART_BY_ID_QUERYResult) => {
		if (!isValidCartData(cart)) {
			console.error("Invalid cart data received");
			return;
		}

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
	clearCart: () => {
		set({
			cartData: null,
			totalItems: 0,
			cartTotal: 0,
			vatTotal: 0,
			grandTotal: 0,
			shippingFee: 0,
		});
	},
}));
