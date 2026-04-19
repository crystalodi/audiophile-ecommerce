"use server";

import { expireCart } from "@/actions/cartActions";
import { cookies } from "next/headers";

const CART_COOKIE_NAME = "audiophile-cart-id";
const CART_TIMESTAMP_COOKIE_NAME = "audiophile-cart-timestamp";
const CART_TTL = 24 * 60 * 60 * 1000;

export async function getCartId() {
	const cookieStore = await cookies();
	const cartId = cookieStore.get(CART_COOKIE_NAME)?.value;
	const timestamp = cookieStore.get(CART_TIMESTAMP_COOKIE_NAME)?.value;

	if (cartId && timestamp) {
		const cartTimestamp = parseInt(timestamp);
		const isExpired = Date.now() - cartTimestamp > CART_TTL;
		if (isExpired) {
			await expireCart(cartId);
			return null;
		}
	}

	return cartId ?? null;
}

export async function setCartId(cartId: string, timestamp?: number) {
	const cookieStore = await cookies();
	const cartTimestamp = timestamp ?? Date.now();

	cookieStore.set(CART_COOKIE_NAME, cartId, {
		httpOnly: false,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 60 * 60 * 24 * 7,
		path: "/",
	});

	cookieStore.set(CART_TIMESTAMP_COOKIE_NAME, cartTimestamp.toString(), {
		httpOnly: false,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 60 * 60 * 24 * 7,
		path: "/",
	});
}

export async function clearCartId() {
	const cookieStore = await cookies();
	cookieStore.delete(CART_COOKIE_NAME);
	cookieStore.delete(CART_TIMESTAMP_COOKIE_NAME);
}
