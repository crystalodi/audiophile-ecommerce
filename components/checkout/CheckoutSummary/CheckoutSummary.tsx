"use client";

import CartProduct from "@/components/cart/CartProduct";
import CartTotal from "@/components/cart/CartTotal";
import { useCartStore } from "@/store/cartStore";
import { useProductStore } from "@/store/productStore";
import { useMemo } from "react";

const VAT_RATE = 0.2;
const SHIPPING_FEE = 50;
export default function CheckoutSummary() {
	const cartItems = useCartStore(state => state.cartItems);
	const getProduct = useProductStore(state => state.getProduct);
	const products = useProductStore(state => state.products);

	const itemsWithPrices = useMemo(() => {
		const items = Array.from(cartItems.values()).filter(
			item => item.quantity > 0
		);

		return items
			.map(cartItem => {
				const product = getProduct(cartItem._id);
				if (!product) return null;

				return {
					...cartItem,
					slug: product.slug,
					price: product.price,
					productName: product.productName,
					cartImage: product.cartImage,
					maxQuantity: product.maxQuantity,
				};
			})
			.filter((item): item is NonNullable<typeof item> => item !== null);
	}, [cartItems, getProduct, products]);
	const totalPrice = itemsWithPrices.reduce((sum, item) => {
		return sum + item.price * item.quantity;
	}, 0);
	const vatTotal = Math.floor(totalPrice * VAT_RATE);
	const grandTotal = totalPrice + vatTotal + SHIPPING_FEE;

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
