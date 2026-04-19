"use client";

import { useCartDataStore } from "@/store/cartDataStore";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import CheckoutConfirmationDialog from "@/components/checkout/CheckoutConfirmationDialog";
import CheckoutContent from "@/components/checkout/CheckoutContent";
import EmptyCheckoutState from "@/components/checkout/EmptyCheckoutState";

export default function CheckoutPageClient() {
	const formRef = useRef<HTMLFormElement>(null);
	const totalItems = useCartDataStore(state => state.totalItems);
	const [isHydrated, setIsHydrated] = useState(false);
	const [orderId, setOrderId] = useState("");
	const [orderCompleted, setOrderCompleted] = useState(false);

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	const handleOrderSuccess = (newOrderId: string) => {
		window.scrollTo(0, 0);
		setOrderId(newOrderId);
		formRef?.current?.reset();
	};

	const closeConfirmationModal = () => {
		setOrderId("");
		setOrderCompleted(true);
	};

	const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		formRef.current?.requestSubmit();
	};

	return (
		<div className="main-container mb-[97px]">
			<div className="mt-4 mb-6">
				<Link
					href="/"
					className="body-text hover:text-audiophile-orange opacity-50 hover:opacity-100"
				>
					Go Back
				</Link>
			</div>

			{!isHydrated ? null : orderCompleted ? (
				<EmptyCheckoutState />
			) : totalItems === 0 && !orderId ? (
				<EmptyCheckoutState />
			) : (
				<CheckoutContent
					formRef={formRef}
					onSubmit={handleFormSubmit}
					onOrderSuccess={handleOrderSuccess}
				/>
			)}

			{orderId && (
				<CheckoutConfirmationDialog
					orderId={orderId}
					open={!!orderId}
					onClose={closeConfirmationModal}
				/>
			)}
		</div>
	);
}
