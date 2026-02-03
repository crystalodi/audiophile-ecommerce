"use client";

import { useCartStore } from "@/store/cartStore";
import { ProductData } from "@/store/productStore";
import QuantitySelector from "@/components/cart/QuantitySelector";
import Image from "next/image";

interface CartProductPropsFromCartDialog extends ProductData {
	quantity: number;
	onClose: () => void;
	variant: "cartDialog";
}

interface CartProductPropsFromCheckout extends ProductData {
	quantity: number;
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
		maxQuantity,
		_id,
		variant,
		onClose,
	} = props;

	const updateQuantity = useCartStore(state => state.updateQuantity);
	const deleteCartItem = useCartStore(state => state.deleteCartItem);

	const onQuantityChange = (newQuantity: number) => {
		if (newQuantity === 0) {
			deleteCartItem(_id);
			setTimeout(() => {
				const updatedTotalItems = useCartStore.getState().totalItems;
				if (updatedTotalItems === 0) {
					onClose && onClose();
				}
			}, 0);
		} else {
			updateQuantity({ _id, quantity: newQuantity });
		}
	};

	return (
		<div className="flex items-center justify-between">
			<div className="bg-audiophile-gray mr-4 h-16 w-16 rounded-lg">
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
