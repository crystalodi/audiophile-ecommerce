"use client";

import CartProduct from "@/components/cart/CartProduct";
import CartTotal from "@/components/cart/CartTotal";
import { useCartDataStore } from "@/store/cartDataStore";
import { useCartStore } from "@/store/cartStore";
import { useProductStore } from "@/store/productStore";
import { useMemo } from "react";

const VAT_RATE = 0.2;
const SHIPPING_FEE = 50;
export default function CheckoutSummary() {
	const cartItems = useCartDataStore(state => state.cartData);
	const getProduct = useProductStore(state => state.getProduct);
	const products = useProductStore(state => state.products);

	const itemsWithPrices = [];
	const totalPrice = 0;
	const vatTotal = 0;
	const grandTotal = 0;

	return (
		<div>
			<div className="flex flex-col gap-y-6">
				{itemsWithPrices.map(item => (
					<CartProduct {...item} variant="checkout" key={item._id} />
				))}
			</div>
			<div className="mt-8">
				<CartTotal
					variant="checkout"
					totalPrice={totalPrice}
					grandTotal={grandTotal}
					vatTotal={vatTotal}
					shippingTotal={SHIPPING_FEE}
				/>
			</div>
		</div>
	);
}
