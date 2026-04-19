"use client";

import { useCartStore } from "@/store/cartStore";
import QuantitySelector from "@/components/cart/QuantitySelector";
import Image from "next/image";
import { CartProductItem, useCartDataStore } from "@/store/cartDataStore";
import { useProductStore } from "@/store/productStore";
import { updateQuantity, deleteCartItem } from "@/actions/cartActions";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CartProductProps extends CartProductItem {
	variant: "checkout" | "cartDialog" | "confirmation";
}

export default function CartProduct(props: CartProductProps) {
	const {
		quantity,
		productName,
		price,
		cartImage,
		_id,
		variant,
		_key,
		cartDisplayName,
	} = props;
	const totalItems = useCartDataStore(state => state.totalItems);
	const maxQuantity = useProductStore(
		state => state.getProduct(_id)?.availableStock ?? 0
	);
	const cartId = useCartStore(state => state.cartId);
	const imageWidthHeight = variant === "confirmation" ? 50 : 64;

	const [localQuantity, setLocalQuantity] = useState(quantity);

	useEffect(() => {
		setLocalQuantity(quantity);
	}, [quantity]);

	useEffect(() => {
		const timer = setTimeout(async () => {
			if (typeof localQuantity !== "number" || localQuantity === quantity) {
				return;
			}

			if (localQuantity !== quantity) {
				if (localQuantity === 0) {
					await deleteCartItem(cartId, _key);
				} else {
					await updateQuantity(cartId, {
						_id,
						quantity: localQuantity,
						_key,
					});
				}
			}
		}, 500);

		return () => clearTimeout(timer);
	}, [localQuantity, quantity, cartId, _id, _key, totalItems]);

	return (
		<div className={cn("flex items-center justify-between")}>
			<div
				className={cn(
					"bg-audiophile-gray mr-4 flex h-16 w-16 items-center rounded-lg",
					{
						"h-[50px] w-[50px]": variant === "confirmation",
					}
				)}
			>
				{cartImage ? (
					<Image
						src={cartImage}
						alt={`${productName} times ${quantity}`}
						objectFit="contain"
						objectPosition="center"
						width={imageWidthHeight}
						height={imageWidthHeight}
						className="rounded-lg"
					/>
				) : (
					<div className="mr-4 h-full w-full rounded-lg" />
				)}
			</div>
			<div className="mr-[19px] flex flex-col justify-center">
				<div className="body-text font-bold! uppercase">{cartDisplayName}</div>
				<div className="text-[14px] font-bold text-black/50">{`$ ${price.toLocaleString("en-US")}`}</div>
			</div>
			<div className="ml-auto">
				{variant === "cartDialog" ? (
					<QuantitySelector
						maxQuantity={maxQuantity}
						quantity={localQuantity}
						onQuantityChange={setLocalQuantity}
						minQuantity={0}
						variant="small"
					/>
				) : (
					<span className="body-text font-bold! text-black/50">
						x{quantity}
					</span>
				)}
			</div>
		</div>
	);
}
