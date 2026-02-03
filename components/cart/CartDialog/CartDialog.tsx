"use client";

import { RefObject, useMemo } from "react";
import Dialog from "@/components/ui/Dialog";
import { useCartStore } from "@/store/cartStore";
import { useProductStore } from "@/store/productStore";
import CartProduct from "@/components/cart/CartProduct";
import CartTotal from "@/components/cart/CartTotal";

interface CartDialogProps {
	open: boolean;
	onClose: () => void;
	anchorRef?: RefObject<HTMLElement | null>;
	onCheckout: () => void;
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

function CartDialog({ open, onClose, anchorRef, onCheckout }: CartDialogProps) {
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
			<div className="flex flex-col">
				<div className="px-[31px] pt-[31px] pr-[31px] pl-[33px]">
					<CartDialogHeader
						totalItems={totalItems}
						onRemoveAll={removeAllCartItems}
					/>
				</div>
				<div className="max-h-60 overflow-y-auto px-[33px] pr-[31px]">
					<div className="flex flex-col gap-y-3.5">
						{itemsWithPrices.map(item => (
							<CartProduct
								key={item.slug}
								{...item}
								onClose={onClose}
								variant="cartDialog"
							/>
						))}
					</div>
				</div>
				<div className="px-[31px] pr-[31px] pb-[31px] pl-[33px]">
					<div className="mt-8">
						<CartTotal variant="cartDialog" totalPrice={totalPrice} />
					</div>
					<div className="mt-6">
						{totalItems > 0 && (
							<button className="btn btn-orange w-full" onClick={onCheckout}>
								checkout
							</button>
						)}
					</div>
				</div>
			</div>
		</Dialog>
	);
}

export default CartDialog;
