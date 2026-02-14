"use client";
import { useState } from "react";
import QuantitySelector from "@/components/cart/QuantitySelector";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";

interface AddToCartProps {
	stock: number;
	productName: string;
	_id: string;
}

export default function AddToCart({ stock, productName, _id }: AddToCartProps) {
	const [quantity, setQuantity] = useState(1);
	const addCartItem = useCartStore(state => state.addCartItem);
	const addToast = useToastStore(state => state.addToast);
	const isDisabled = stock === 0;

	const handleAddToCart = async () => {
		await addCartItem({
			quantity,
			_id,
		});
		addToast(`${productName} added to cart!`, "success", 3000);
		setQuantity(1);
	};

	return (
		<div className="flex items-center gap-[16px]">
			<QuantitySelector
				maxQuantity={stock}
				quantity={quantity}
				onQuantityChange={setQuantity}
				disabled={isDisabled}
			/>
			<button
				className="btn btn-orange"
				onClick={handleAddToCart}
				disabled={isDisabled}
			>
				Add to cart
			</button>
		</div>
	);
}
