"use client";

import { useCartDataStore } from "@/store/cartDataStore";
import CartProduct from "@/components/cart/CartProduct";
import CartTotal from "@/components/cart/CartTotal";
import { clearCart } from "@/actions/cartActions";
import { useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Popover from "@/components/ui/Popover";
import { useCartProducts } from "@/hooks/useCartProducts";

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
		<div className="flex h-full flex-col items-center justify-center gap-y-5 px-7 py-[31px] text-center">
			<h3 className="heading-6">Your Cart is Empty</h3>
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
	const cartId = useCartStore(state => state.cartId);
	const setClientSideCartId = useCartStore(state => state.setCartId);

	const cartProducts = useCartProducts();

	const removeAllCartItems = async () => {
		onClose();
		await clearCart(cartId);
		setClientSideCartId("");
	};

	return (
		<div className="flex max-h-[inherit] flex-col overflow-auto px-7 py-[31px]">
			<div>
				<CartDialogHeader
					totalItems={totalItems}
					onRemoveAll={removeAllCartItems}
				/>
			</div>
			<div>
				<div className="flex flex-col gap-y-3.5">
					{cartProducts?.map(item => (
						<CartProduct key={item._id} {...item} variant="cartDialog" />
					))}
				</div>
			</div>
			<div>
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
			role="dialog"
			className={cn(
				"inset-auto top-[113px] right-[var(--sm-container-margin)] m-0 w-[87.2%] overflow-hidden md:right-[var(--md-container-margin)] md:w-[377px] lg:right-[var(--lg-container-margin)]",
				{
					"max-h-[min(488px,calc(100dvh-137px))]": totalItems,
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
