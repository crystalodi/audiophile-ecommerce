"use client";

import CartProduct from "@/components/cart/CartProduct";
import CartTotal from "@/components/cart/CartTotal";
import { useCartProducts } from "@/hooks/useCartProducts";
import { useCartDataStore } from "@/store/cartDataStore";

export default function CheckoutSummary() {
	const totalPrice = useCartDataStore(state => state.cartTotal);
	const vatTotal = useCartDataStore(state => state.vatTotal);
	const grandTotal = useCartDataStore(state => state.grandTotal);
	const shippingTotal = useCartDataStore(state => state.shippingFee);

	const cartProducts = useCartProducts();

	return (
		<div>
			<div className="flex flex-col gap-y-6">
				{cartProducts.map(item => (
					<CartProduct {...item} variant="checkout" key={item._id} />
				))}
			</div>
			<div className="mt-8">
				<CartTotal
					variant="checkout"
					totalPrice={totalPrice}
					grandTotal={grandTotal}
					vatTotal={vatTotal}
					shippingTotal={shippingTotal}
				/>
			</div>
		</div>
	);
}
