"use client";

import Dialog from "@/components/ui/Dialog";
import OrderConfirmationIcon from "@/assets/icons/icon-order-confirmation.svg";
import { useEffect, useState } from "react";
import CartProduct from "@/components/cart/CartProduct";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";
import { getOrderConfirmation } from "@/actions/orderActions";
import { ORDER_BY_ID_QUERYResult } from "@/sanity.types";

interface CheckoutConfirmationDialogProps {
	orderId: string;
	onClose: () => void;
	open: boolean;
}

function CheckoutConfirmationSummary({
	cartData: { items, grandTotal },
}: {
	cartData: NonNullable<ORDER_BY_ID_QUERYResult>;
}) {
	const [showAll, setShowAll] = useState(false);
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
							_id={item.productId}
							_key={item._key}
							productName={item.productName}
							price={item.price}
							cartImage={urlFor(item.cartImage.asset).url()}
							quantity={item.quantity}
							variant="confirmation"
							cartDisplayName={item.cartDisplayName!}
						/>
					))}
				</div>
				{remainingCount > 0 && (
					<>
						<div className="my-3 h-px bg-black/10" />
						<button
							className="w-full cursor-pointer text-center text-xs font-bold -tracking-[0.21px] text-black/50"
							onClick={() => setShowAll(!showAll)}
						>
							{showAll ? "View less" : `and ${remainingCount} other item(s)`}
						</button>
					</>
				)}
			</div>
			<div className="flex flex-shrink-0 flex-col justify-end bg-black px-6 pt-4 pb-[18px] text-white md:h-auto md:w-[198px] md:pt-[41px] md:pb-[42px] lg:px-8 lg:pb-[41px]">
				<p className="body-text mb-2 text-white/50 uppercase">grand total</p>
				<p className="heading-6">$ {(grandTotal ?? 0).toLocaleString()}</p>
			</div>
		</div>
	);
}

function ConfirmationSkeleton() {
	return (
		<div className="flex flex-col overflow-hidden rounded-lg md:flex-row">
			<div className="bg-audiophile-gray flex-1 p-6">
				<div className="flex items-center gap-4">
					<div className="animate-shimmer h-[50px] w-[50px] bg-black/10" />
					<div className="flex flex-col gap-2">
						<div className="animate-shimmer h-4 w-24 bg-black/10" />
						<div className="animate-shimmer h-3 w-16 bg-black/10" />
					</div>
				</div>
			</div>
			<div className="flex h-[92px] flex-col justify-center bg-black px-6 md:h-auto md:w-[198px]">
				<div className="animate-shimmer mb-2 h-3 w-20 bg-white/20" />
				<div className="animate-shimmer h-5 w-24 bg-white/20" />
			</div>
		</div>
	);
}

export default function CheckoutConfirmationDialog({
	orderId,
	onClose,
	open,
}: CheckoutConfirmationDialogProps) {
	const [orderData, setOrderData] = useState<ORDER_BY_ID_QUERYResult>(null);
	const router = useRouter();

	useEffect(() => {
		if (orderId) {
			getOrderConfirmation(orderId).then(setOrderData);
		}
	}, [orderId]);

	const onGoToHomeClick = () => {
		onClose();
		router.push("/");
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			className="max-h-[min(600px,75dvh_-_90px)] w-[87.2%] md:max-h-[min(581px,75dvh_-_90px)] md:w-135 lg:max-h-[min(713px,75dvh_-_90px)]"
			preventClose={true}
		>
			<div className="flex max-h-[inherit] flex-col overflow-y-auto p-8 md:p-12">
				<div className="mb-[23px] flex h-16 w-16 flex-shrink-0 items-center justify-center md:mb-[33px]">
					<OrderConfirmationIcon aria-hidden={true} />
				</div>
				<div className="mb-6">
					<h1 className="heading-5 md:heading-3 mb-4 flex-shrink-0 leading-7 tracking-[0.83px] md:mb-6">
						thank you
						<br />
						for your order
					</h1>
					<p className="body-text mb-6 flex-shrink-0 text-black/50 md:mb-[33px]">
						You will receive an email confirmation shortly.
					</p>
					<div>
						{orderData ? (
							<CheckoutConfirmationSummary cartData={orderData} />
						) : (
							<ConfirmationSkeleton />
						)}
					</div>
				</div>
				<div className="w-full flex-shrink-0">
					<button className="btn btn-orange w-full" onClick={onGoToHomeClick}>
						back to home
					</button>
				</div>
			</div>
		</Dialog>
	);
}
