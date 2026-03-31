"use client";

import CartProduct from "@/components/cart/CartProduct";
import CartTotal from "@/components/cart/CartTotal";
import { urlFor } from "@/sanity/lib/image";
import { useCartDataStore } from "@/store/cartDataStore";
import { useMemo } from "react";

export default function CheckoutSummary() {
	const cartItems = useCartDataStore(state => state.cartData?.items);
	const totalPrice = useCartDataStore(state => state.cartTotal);
	const vatTotal = useCartDataStore(state => state.vatTotal);
	const grandTotal = useCartDataStore(state => state.grandTotal);
	const shippingTotal = useCartDataStore(state => state.shippingFee);

	const cartProducts = useMemo(() => {
		return (
			cartItems?.map(item => ({
				_id: item.product._id,
				productName: item.product.productName,
				cartImage: urlFor(item.product.cartImage.asset).url(),
				_key: item._key,
				price: item.product.price,
				quantity: item.quantity,
			})) ?? []
		);
	}, [cartItems]);

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
