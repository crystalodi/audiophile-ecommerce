"use client";

import { RefObject, useMemo } from "react";
import Image from "next/image";
import Dialog from "@/components/ui/Dialog";
import { useCartStore } from "@/store/cartStore";
import { ProductData, useProductStore } from "@/store/productStore";
import QuantitySelector from "@/components/cart/QuantitySelector";

type CartDialogProps = {
	open: boolean;
	onClose: () => void;
	anchorRef?: RefObject<HTMLElement | null>;
};

type CartProductProps = ProductData & {
	quantity: number;
	onClose: () => void;
};

function CartProduct({
	quantity,
	productName,
	price,
	cartImage,
	maxQuantity,
	onClose,
	_id,
}: CartProductProps) {
	const updateQuantity = useCartStore(state => state.updateQuantity);
	const deleteCartItem = useCartStore(state => state.deleteCartItem);

	const onQuantityChange = (newQuantity: number) => {
		if (newQuantity === 0) {
			deleteCartItem(_id);
			setTimeout(() => {
				const updatedTotalItems = useCartStore.getState().totalItems;
				if (updatedTotalItems === 0) {
					onClose();
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
				<QuantitySelector
					maxQuantity={maxQuantity}
					quantity={quantity}
					onQuantityChange={onQuantityChange}
					minQuantity={0}
					variant="small"
				/>
			</div>
		</div>
	);
}

function CartDialogHeader({
	totalItems,
	onRemoveAll,
}: {
	totalItems: number;
	onRemoveAll: () => void;
}) {
	return (
		<div className="mb-[31px] flex items-center justify-between">
			<h1 className="heading-6">cart {`(${totalItems})`}</h1>
			{totalItems > 0 && (
				<button
					className="body-text cursor-pointer bg-transparent text-black/50 underline"
					onClick={onRemoveAll}
				>
					Remove All
				</button>
			)}
		</div>
	);
}

function CartDialogFooter({
	totalPrice,
	totalItems,
}: {
	totalPrice: number;
	totalItems: number;
}) {
	return (
		<>
			<div className="mt-8 flex">
				<div className="body-text mr-auto text-black/50 uppercase">total</div>
				<div className="font-bold">${totalPrice.toLocaleString("en-US")}</div>
			</div>
			<div className="mt-6">
				{totalItems > 0 && (
					<button className="btn btn-orange w-full">checkout</button>
				)}
			</div>
		</>
	);
}

function CartDialog({ open, onClose, anchorRef }: CartDialogProps) {
	const clearCart = useCartStore(state => state.clearCart);
	const totalItems = useCartStore(state => state.totalItems);
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

	const offsetMemo = useMemo(() => ({ x: 0, y: 24 }), []);

	const removeAllCartItems = () => {
		onClose();
		clearCart();
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			className="max-h-[488px] w-[87.2%] rounded-lg md:w-[377px]"
			anchorRef={anchorRef}
			placement="bottom-right"
			positionStrategy="anchor"
			useParentHorizontalPaddingAsOffset
			offset={offsetMemo}
		>
			<div className="py-[31px] pr-[31px] pl-[33px]">
				<div className="flex flex-col">
					<CartDialogHeader
						totalItems={totalItems}
						onRemoveAll={removeAllCartItems}
					/>
					<div className="flex flex-col gap-y-3.5">
						{itemsWithPrices.map(item => (
							<CartProduct key={item.slug} {...item} onClose={onClose} />
						))}
					</div>
					<CartDialogFooter totalPrice={totalPrice} totalItems={totalItems} />
				</div>
			</div>
		</Dialog>
	);
}

export default CartDialog;
