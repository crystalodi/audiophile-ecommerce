"use client";

import { useCartStore } from "@/store/cartStore";
import QuantitySelector from "@/components/cart/QuantitySelector";
import Image from "next/image";
import { CartProductItem, useCartDataStore } from "@/store/cartDataStore";
import { useProductStore } from "@/store/productStore";
import { updateQuantity, deleteCartItem } from "@/actions/cartActions";

interface CartProductPropsFromCartDialog extends CartProductItem {
	onClose: () => void;
	variant: "cartDialog";
}

interface CartProductPropsFromCheckout extends CartProductItem {
	variant: "checkout";
	onClose?: never;
}

type CartProductProps =
	| CartProductPropsFromCartDialog
	| CartProductPropsFromCheckout;

export default function CartProduct(props: CartProductProps) {
	const {
		quantity,
		productName,
		price,
		cartImage,
		_id,
		variant,
		onClose,
		_key,
	} = props;

	const totalItems = useCartDataStore(state => state.totalItems);
	const maxQuantity = useProductStore(
		state => state.getProduct(_id)?.availableStock ?? 0
	);
	const cartId = useCartStore(state => state.cartId);

	const onQuantityChange = async (newQuantity: number) => {
		if (newQuantity === 0) {
			const isLastItem = totalItems === 1;
			await deleteCartItem(cartId, _key);
			if (isLastItem) {
				onClose && onClose();
			}
		} else {
			await updateQuantity(cartId, {
				_id,
				quantity: newQuantity,
				_key,
			});
		}
	};

	return (
		<div className="flex items-center justify-between">
			<div className="bg-audiophile-gray mr-4 flex h-16 w-16 items-center rounded-lg">
				{cartImage ? (
					<Image
						src={cartImage}
						alt={`${productName} X ${quantity}`}
						objectFit="contain"
						objectPosition="center"
						width={64}
						height={64}
						className="rounded-lg"
					/>
				) : (
					<div className="h-full w-full rounded-lg" />
				)}
			</div>
			<div className="flex flex-col justify-center">
				<div className="body-text font-bold! uppercase">{productName}</div>
				<div className="text-[14px] font-bold text-black/50">{`$ ${price.toLocaleString("en-US")}`}</div>
			</div>
			<div className="ml-auto">
				{variant === "cartDialog" && (
					<QuantitySelector
						maxQuantity={maxQuantity}
						quantity={quantity}
						onQuantityChange={onQuantityChange}
						minQuantity={0}
						variant="small"
					/>
				)}
				{variant === "checkout" && (
					<span className="body-text font-bold text-black/50">x{quantity}</span>
				)}
			</div>
		</div>
	);
}
