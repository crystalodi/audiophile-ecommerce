"use client";

import { useState, useTransition } from "react";
import QuantitySelector from "@/components/cart/QuantitySelector";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { useCartDataStore } from "@/store/cartDataStore";
import { addItemToCart, createCart } from "@/actions/cartActions";
import { setCartId as setCartIdCookie } from "@/actions/cartCookieActions";

interface AddToCartProps {
	stock: number;
	productName: string;
	_id: string;
}

export default function AddToCart({ stock, productName, _id }: AddToCartProps) {
	const [quantity, setQuantity] = useState(1);
	const [isPending, startTransition] = useTransition();

	const addToast = useToastStore(state => state.addToast);
	const cartId = useCartStore(state => state.cartId);
	const cartItems = useCartDataStore(state => state.cartData?.items);
	const existingItem = cartItems?.find(item => item?.product?._id === _id);
	const isDisabled = stock === 0;
	const setClientSideCartId = useCartStore(state => state.setCartId);

	const handleAddToCart = () => {
		startTransition(async () => {
			try {
				if (!cartId) {
					const response = await createCart([
						{
							_id,
							quantity,
						},
					]);
					if (response.data && response.success) {
						const newCartId = response.data._id;
						const timestamp = new Date(response.data._createdAt).getTime();
						await setCartIdCookie(newCartId, timestamp);
						setClientSideCartId(newCartId);
					}
				} else {
					await addItemToCart(cartId, {
						_id,
						quantity: quantity + (existingItem?.quantity ?? 0),
						_key: existingItem?._key,
					});
				}
				addToast(`${productName} added to cart!`, "success", 3000);
			} catch (e) {
				console.error(`Error adding ${productName} to cart`, e);
				addToast(
					`Error Adding ${productName} to cart. Please try again.`,
					"error",
					3000
				);
			} finally {
				setQuantity(1);
			}
		});
	};

	return (
		<div className="flex items-center gap-[16px]">
			<QuantitySelector
				maxQuantity={stock}
				quantity={quantity}
				onQuantityChange={setQuantity}
				disabled={isDisabled || isPending}
			/>
			<button
				className="btn btn-orange"
				onClick={handleAddToCart}
				disabled={isDisabled || isPending}
			>
				{isDisabled ? "Out of Stock" : isPending ? "Adding..." : "Add to Cart"}
			</button>
		</div>
	);
}
