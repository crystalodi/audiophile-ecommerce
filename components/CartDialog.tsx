"use client";

import { RefObject, useMemo } from "react";
import Image from "next/image";
import Dialog from "./Dialog";
import {
	CartItem,
	useCartStore,
	useCartWithProductDetail,
} from "@/store/cartStore";
import QuantitySelector from "./QuantitySelector";
import { CustomImageType } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

type CartDialogProps = {
	open: boolean;
	onClose: () => void;
	anchorRef?: RefObject<HTMLElement | null>;
};

function CartProduct({
	slug,
	quantity,
	productName,
	price,
	image,
	maxQuantity,
}: {
	slug: string;
	quantity: number;
	productName: string;
	price: number;
	image: CustomImageType;
	maxQuantity: number;
}) {
	const imageUrl = urlFor(image.mobile.asset).url();
	const updateQuantity = useCartStore(state => state.updateQuantity);
	const deleteCartItem = useCartStore(state => state.deleteCartItem);

	const onQuantityChange = (newQuantity: number) => {
		if (newQuantity === 0) {
			deleteCartItem(slug);
		} else {
			updateQuantity({ slug, quantity: newQuantity });
		}
	};

	return (
		<div className="flex items-center justify-between">
			<div className="h-16 w-16 bg-audiophile-gray mr-4 rounded-lg">
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt={`${productName} X ${quantity}`}
						objectFit="contain"
						objectPosition="center"
						width={64}
						height={64}
						className="rounded-lg"
					/>
				) : (
					<div className="w-full h-full rounded-lg" />
				)}
			</div>
			<div className="flex flex-col justify-center">
				<div className="body-text uppercase font-bold!">{productName}</div>
				<div className="text-black/50 text-[14px] font-bold">{`$ ${price.toLocaleString("en-US")}`}</div>
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

function CartProductSkeleton() {
	return (
		<div className="flex items-center justify-between">
			<div className="h-16 w-16 rounded-lg animate-shimmer mr-4"></div>
			<div className="flex flex-col justify-center gap-1">
				<div className="h-4 w-24 animate-shimmer" />
				<div className="h-4 w-16 animate-shimmer" />
			</div>
			<div className="ml-auto">
				<div className="h-8 w-20 animate-shimmer" />
			</div>
		</div>
	);
}

function CartDialogSkeleton() {
	return (
		<>
			{Array.from({ length: 3 }).map((_, index) => (
				<CartProductSkeleton key={index} />
			))}
		</>
	);
}

function CartDialogHeader({
	isLoading,
	totalItems,
	onRemoveAll,
}: {
	isLoading: boolean;
	totalItems: number;
	onRemoveAll: () => void;
}) {
	if (!isLoading && totalItems === 0) {
		return <></>;
	}

	return (
		<div className="flex justify-between items-center mb-[31px]">
			{isLoading ? (
				<>
					<div className="h-6 w-20 animate-shimmer" />
					<div className="h-4 w-16 animate-shimmer" />
				</>
			) : (
				<>
					<h1 className="heading-6">cart {`(${totalItems})`}</h1>
					{totalItems > 0 && (
						<button
							className="btn-transparent body-text text-black/50 cursor-pointer underline"
							onClick={onRemoveAll}
						>
							Remove All
						</button>
					)}
				</>
			)}
		</div>
	);
}

function CartDialogFooter({
	isLoading,
	total,
	itemsWithPrices,
}: {
	isLoading: boolean;
	total: number;
	itemsWithPrices: Array<
		CartItem & {
			price: number;
			productName: string;
			image: CustomImageType;
			maxQuantity: number;
		}
	>;
}) {
	if (!isLoading && itemsWithPrices.length === 0) {
		return <></>;
	}

	return (
		<>
			<div className="flex mt-8">
				{isLoading ? (
					<>
						<div className="h-4 w-12 animate-shimmer mr-auto" />
						<div className="h-4 w-16 animate-shimmer" />
					</>
				) : (
					<>
						<div className="body-text text-black/50 uppercase mr-auto">
							total
						</div>
						<div className="font-bold">${total.toLocaleString("en-US")}</div>
					</>
				)}
			</div>
			<div className="mt-6">
				{isLoading ? (
					<div className="h-12 w-full animate-shimmer" />
				) : (
					itemsWithPrices.length > 0 && (
						<button className="btn btn-orange w-full">checkout</button>
					)
				)}
			</div>
		</>
	);
}

function CartDialog({ open, onClose, anchorRef }: CartDialogProps) {
	const clearCart = useCartStore(state => state.clearCart);
	const { itemsWithPrices, isLoading } = useCartWithProductDetail();

	const total = itemsWithPrices.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);
	const totalItems = isLoading ? 0 : itemsWithPrices.length;
	const offsetMemo = useMemo(() => ({ x: 0, y: 24 }), []);

	const removeAllCartItems = () => {
		onClose();
		clearCart();
	};

	const renderCartContent = () => {
		if (isLoading) {
			return <CartDialogSkeleton />;
		}

		if (itemsWithPrices.length === 0) {
			return <div></div>;
		}

		return itemsWithPrices.map(item => (
			<CartProduct
				key={item.slug}
				slug={item.slug}
				quantity={item.quantity}
				productName={item.productName}
				price={item.price}
				image={item.image}
				maxQuantity={item.maxQuantity}
			/>
		));
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			className="w-[87.2%] md:w-[377px] rounded-lg max-h-[488px]"
			anchorRef={anchorRef}
			placement="bottom-right"
			positionStrategy="anchor"
			useParentHorizontalPaddingAsOffset
			offset={offsetMemo}
		>
			<div className="py-[31px] pl-[33px] pr-[31px]">
				<div className="flex flex-col">
					<CartDialogHeader
						isLoading={isLoading}
						totalItems={totalItems}
						onRemoveAll={removeAllCartItems}
					/>
					<div className="flex flex-col gap-y-3.5">{renderCartContent()}</div>
					<CartDialogFooter
						isLoading={isLoading}
						total={total}
						itemsWithPrices={itemsWithPrices}
					/>
				</div>
			</div>
		</Dialog>
	);
}

export default CartDialog;
