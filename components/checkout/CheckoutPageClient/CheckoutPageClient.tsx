"use client";

import { useCartDataStore } from "@/store/cartDataStore";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { CartData } from "@/store/cartDataStore";
import CheckoutConfirmationDialog from "@/components/checkout/CheckoutConfirmationDialog";
import CheckoutContent from "@/components/checkout/CheckoutContent";
import EmptyCheckoutState from "@/components/checkout/EmptyCheckoutState";

export default function CheckoutPageClient() {
	const formRef = useRef<HTMLFormElement>(null);
	const totalItems = useCartDataStore(state => state.totalItems);
	const [isHydrated, setIsHydrated] = useState(false);
	const [confirmationData, setConfirmationData] = useState<{
		cartData: CartData;
		grandTotal: number;
	} | null>(null);

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	const handleOrderSuccess = (cartData: CartData, grandTotal: number) => {
		window.scrollTo(0, 0);
		setConfirmationData({ cartData, grandTotal });
	};

	const closeConfirmationModal = () => {
		setConfirmationData(null);
	};

	const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		formRef.current?.requestSubmit();
	};

	return (
		<div className="main-container mb-[97px]">
			<div className="mt-4 mb-6">
				<Link href="/" className="body-text opacity-50">
					Go Back
				</Link>
			</div>

			{!isHydrated ? null : confirmationData ? (
				<EmptyCheckoutState />
			) : totalItems === 0 ? (
				<EmptyCheckoutState />
			) : (
				<CheckoutContent
					formRef={formRef}
					onSubmit={handleFormSubmit}
					onOrderSuccess={handleOrderSuccess}
				/>
			)}

			{confirmationData && (
				<CheckoutConfirmationDialog
					cartData={confirmationData.cartData}
					grandTotal={confirmationData.grandTotal}
					open={!!confirmationData}
					onClose={closeConfirmationModal}
				/>
			)}
		</div>
	);
}
