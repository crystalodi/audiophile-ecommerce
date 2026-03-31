import { getCartId } from "@/actions/cartCookieActions";
import { fetchCart } from "@/sanity/lib/cartApi";
import CartInitializerClient from "./CartInitializerClient";

export default async function CartInitializer() {
	const cartId = await getCartId();
	const initialCart = cartId ? await fetchCart(cartId) : null;

	return (
		<CartInitializerClient initialCartId={cartId} initialCart={initialCart} />
	);
}
