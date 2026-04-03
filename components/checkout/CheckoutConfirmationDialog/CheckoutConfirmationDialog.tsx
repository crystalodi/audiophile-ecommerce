"use client";

import { CartData } from "@/store/cartDataStore";
import Dialog from "@/components/ui/Dialog";
import OrderConfirmationIcon from "@/public/icon-order-confirmation.svg";
import { useState } from "react";
import CartProduct from "@/components/cart/CartProduct";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";

interface CheckoutConfirmationDialogProps {
	cartData: CartData;
	grandTotal: number;
	onClose: () => void;
	open: boolean;
}

interface CheckoutConfirmationSummaryProps {
	cartData: CartData;
	grandTotal: number;
}

function CheckoutConfirmationSummary({
	cartData,
	grandTotal,
}: CheckoutConfirmationSummaryProps) {
	const [showAll, setShowAll] = useState(false);
	const items = cartData.items;
	const firstItem = items[0];
	const remainingCount = items.length - 1;

	const visibleItems = showAll ? items : [firstItem];

	return (
		<div className="flex flex-col overflow-hidden rounded-lg md:flex-row">
			<div className="bg-audiophile-gray flex-1 p-6">
				<div className="flex flex-col">
					{visibleItems.map(item => (
						<CartProduct
							key={item._key}
							_id={item.product._id}
							_key={item._key}
							productName={item.product.productName}
							price={item.product.price}
							cartImage={urlFor(item.product.cartImage.asset).url()}
							quantity={item.quantity}
							variant="confirmation"
						/>
					))}
				</div>
				{remainingCount > 0 && (
					<>
						<div className="my-3 h-px bg-black/10" />
						<button
							className="body-text w-full cursor-pointer text-center text-black/50"
							onClick={() => setShowAll(!showAll)}
						>
							{showAll
								? "View less"
								: `and ${remainingCount} other item${remainingCount > 1 ? "s" : ""}`}
						</button>
					</>
				)}
			</div>
			<div className="flex h-[92px] flex-shrink-0 flex-col justify-center bg-black px-6 text-white md:h-auto md:w-[198px]">
				<p className="body-text mb-2 text-white/50 uppercase">grand total</p>
				<p className="heading-6">$ {grandTotal.toLocaleString()}</p>
			</div>
		</div>
	);
}
export default function CheckoutConfirmationDialog({
	cartData,
	onClose,
	grandTotal,
	open,
}: CheckoutConfirmationDialogProps) {
	const router = useRouter();

	const onGoToHomeClick = () => {
		onClose();
		router.push("/");
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			className="max-h-[min(600px,75vh-90px)] w-[87.2%] md:max-h-[581px] md:w-135 lg:max-h-[713px]"
			preventClose={true}
		>
			<div className="overflow-y-auto p-8 md:p-12">
				<div className="flex flex-col items-start justify-center">
					<div className="mb-[23px] flex h-16 w-16 items-center justify-center md:mb-[33px]">
						<OrderConfirmationIcon aria-hidden={true} />
					</div>
					<h1 className="heading-5 md:heading-3 mb-4 leading-7 tracking-[0.83px] md:mb-6">
						thank you
						<br />
						for your order
					</h1>
					<p className="body-text mb-6 text-black/50 md:mb-[33px]">
						You will receive an email confirmation shortly.
					</p>
					<div className="mb-6 w-full">
						<CheckoutConfirmationSummary
							grandTotal={grandTotal}
							cartData={cartData}
						/>
					</div>
					<div className="w-full">
						<button className="btn btn-orange w-full" onClick={onGoToHomeClick}>
							back to home
						</button>
					</div>
				</div>
			</div>
		</Dialog>
	);
}
