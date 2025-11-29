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
			<div className="bg-audiophile-gray mr-4 h-16 w-16 rounded-lg">
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

function CartProductSkeleton() {
	return (
		<div className="flex items-center justify-between">
			<div className="animate-shimmer mr-4 h-16 w-16 rounded-lg"></div>
			<div className="flex flex-col justify-center gap-1">
				<div className="animate-shimmer h-4 w-24" />
				<div className="animate-shimmer h-4 w-16" />
			</div>
			<div className="ml-auto">
				<div className="animate-shimmer h-8 w-20" />
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
		<div className="mb-[31px] flex items-center justify-between">
			{isLoading ? (
				<>
					<div className="animate-shimmer h-6 w-20" />
					<div className="animate-shimmer h-4 w-16" />
				</>
			) : (
				<>
					<h1 className="heading-6">cart {`(${totalItems})`}</h1>
					{totalItems > 0 && (
						<button
							className="btn-transparent body-text cursor-pointer text-black/50 underline"
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
			<div className="mt-8 flex">
				{isLoading ? (
					<>
						<div className="animate-shimmer mr-auto h-4 w-12" />
						<div className="animate-shimmer h-4 w-16" />
					</>
				) : (
					<>
						<div className="body-text mr-auto text-black/50 uppercase">
							total
						</div>
						<div className="font-bold">${total.toLocaleString("en-US")}</div>
					</>
				)}
			</div>
			<div className="mt-6">
				{isLoading ? (
					<div className="animate-shimmer h-12 w-full" />
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
