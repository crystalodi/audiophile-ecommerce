"use client";

import { useMemo } from "react";
import { useCartDataStore } from "@/store/cartDataStore";
import CartProduct from "@/components/cart/CartProduct";
import CartTotal from "@/components/cart/CartTotal";
import { urlFor } from "@/sanity/lib/image";
import { clearCart } from "@/actions/cartActions";
import { useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Popover from "@/components/ui/Popover";

interface CartDialogProps {
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
function EmptyCartContent({ onClose }: { onClose: () => void }) {
	const router = useRouter();
	const pathname = usePathname();

	const onShopNowClick = () => {
		const validCategories = ["headphones", "speakers", "earphones"];
		const isOnCategoryOrProductPage = validCategories.some(category =>
			pathname.toLowerCase().startsWith(`/${category}`)
		);

		if (isOnCategoryOrProductPage) {
			onClose();
		} else {
			onClose();
			router.push("/headphones");
		}
	};
	return (
		<div className="flex h-full flex-col items-center justify-center gap-y-5 px-[31px] pt-[31px] pr-[31px] pl-[33px] text-center">
			<h3 className="heading-5">Your Cart is Empty</h3>
			<p className="body-text text-black/50">
				Browse our collection and add items to get started.
			</p>
			<div className="w-full">
				<button
					className="btn btn-transparent group w-full gap-2 uppercase hover:bg-white hover:text-black"
					onClick={onShopNowClick}
				>
					shop now{" "}
					<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
				</button>
			</div>
		</div>
	);
}

function CartContent({
	onCheckout,
	onClose,
}: {
	onCheckout: () => void;
	onClose: () => void;
}) {
	const totalItems = useCartDataStore(state => state.totalItems);
	const cartTotal = useCartDataStore(state => state.cartTotal);
	const cartItems = useCartDataStore(state => state.cartData?.items);
	const cartId = useCartStore(state => state.cartId);
	const setClientSideCartId = useCartStore(state => state.setCartId);

	const cartProducts = useMemo(() => {
		return (
			cartItems?.map(item => ({
				_id: item.product._id,
				productName: item.product.productName,
				cartImage: urlFor(item.product.cartImage.asset).url(),
				_key: item._key,
				price: item.product.price,
				quantity: item.quantity,
			})) ?? []
		);
	}, [cartItems]);

	const removeAllCartItems = async () => {
		onClose();
		await clearCart(cartId);
		setClientSideCartId("");
	};

	return (
		<div className="flex flex-col">
			<div className="px-[31px] pt-[31px] pr-[31px] pl-[33px]">
				<CartDialogHeader
					totalItems={totalItems}
					onRemoveAll={removeAllCartItems}
				/>
			</div>
			<div className="max-h-60 overflow-y-auto px-[33px] pr-[31px]">
				<div className="flex flex-col gap-y-3.5">
					{cartProducts?.map(item => (
						<CartProduct key={item._id} {...item} variant="cartDialog" />
					))}
				</div>
			</div>
			<div className="px-[31px] pr-[31px] pb-[31px] pl-[33px]">
				<div className="mt-8">
					<CartTotal variant="cartDialog" totalPrice={cartTotal} />
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
	);
}

function CartDialog({ onCheckout }: CartDialogProps) {
	const totalItems = useCartDataStore(state => state.totalItems);

	const onClose = () => {
		document.getElementById("cart-popover")?.hidePopover();
	};

	return (
		<Popover
			id="cart-popover"
			popover="auto"
			backdropClassName="bg-black/40"
			className={cn(
				"inset-auto top-[113px] right-[var(--sm-container-margin)] m-0 w-[87.2%] md:right-[var(--md-container-margin)] md:w-[377px] lg:right-[var(--lg-container-margin)]",
				{
					"max-h-[min(488px,calc(100vh-137px))]": totalItems,
					"h-62.5": !totalItems,
				}
			)}
		>
			{totalItems === 0 ? (
				<EmptyCartContent onClose={onClose} />
			) : (
				<CartContent onClose={onClose} onCheckout={onCheckout} />
			)}
		</Popover>
	);
}

export default CartDialog;
