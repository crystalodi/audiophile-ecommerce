export function getClientCartId() {
	if (typeof document === "undefined") return null;
	const match = document.cookie.match(/audiophile-cart-id=([^;]+)/);
	return match ? match[1] : null;
}
